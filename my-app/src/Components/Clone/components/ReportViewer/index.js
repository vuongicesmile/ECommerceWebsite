import React, { useEffect, useRef } from 'react';
import ko from 'knockout';
import 'devexpress-reporting/dx-webdocumentviewer';
import 'devexpress-reporting/dx-reportdesigner';
import { PreviewElements, ActionId } from 'devexpress-reporting/dx-webdocumentviewer';
import { useModel } from 'umi';
import { URL_API_REPORT } from '@/e2e/configSystem';

const ReportViewer = ({ name, reload, onShowReport, onClick, zoom }) => {
  const { config } = useModel('defaultdata');
  const viewer = useRef();
  const reportUrl = ko.observable(name);
  const requestOptions = {
    host: URL_API_REPORT,
    invokeAction: 'DXXRDV',
  };

  useEffect(() => {
    ko.applyBindings(
      {
        reportUrl: reportUrl,
        requestOptions: requestOptions,
        callbacks: {
          XlsxExportMode: (s, e) => {
            console.log(s);
            console.log(e);
          },
          OnExport: (s, e) => {
            console.log(s);
            console.log(e);
          },

          PreviewClick: (s, e) => {
            if (onClick) onClick(s, e);
          },
          CustomizeElements: (s, e) => {
            var panelPart = e.GetById(PreviewElements.RightPanel);
            var index = e.Elements.indexOf(panelPart);
            e.Elements.splice(index, 1);
          },
          ParametersInitialized: (s, e) => {
            onShowReport(s, e);
          },
          CustomizeMenuActions: (s, e) => {
            let actionSearch = e.GetById(ActionId.Search);
            if (actionSearch) actionSearch.visible = false;

            const previewModel = s.previewModel;
            if (previewModel) {
              previewModel.reportPreview.showMultipagePreview(true);
            }
            // s.previewModel.reportPreview.showMultipagePreview(true);

            let zoomSearch = e.GetById(ActionId.ZoomSelector);
            zoomSearch.zoom(zoom ?? config.find((i) => i.parameter == 'ReportSize').value);
          },
        },
      },
      viewer.current,
    );

    return () => {
      if (viewer.current) {
        ko.cleanNode(viewer.current);
      }
    };
  }, [reload]);

  return <div ref={viewer} data-bind="dxReportViewer: $data"></div>;
};

export { ReportViewer };
