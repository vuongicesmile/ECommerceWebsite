import Modal from '../Popup';
import { label } from '../Label';
import './confirmpopup.less';
import { useIntl } from 'umi';
import { buttonList } from '../Button';

const ConfirmPopup = ({
  content,
  onConfirm,
  visible,
  setVisible,
  toRoot = false,
  thirdButton,
  thirdButtonTitle,
  onThirdButtonClick,
  okTitle,
  loadingOK = false,
  disableCancel = false,
  isPopupConfirm = true,
}) => {
  const intl = useIntl();
  return (
    <div className="confirm-popup-container">
      <Modal
        isPopupConfirm={isPopupConfirm}
        toRoot={toRoot}
        size={thirdButton ? 'sm' : 's'}
        visible={visible}
        title={intl.formatMessage({ id: 'component.confirmpopup.confirm' })}
        onClose={() => {
          setVisible(false);
        }}
        disableCancel={disableCancel}
        loadingOK={loadingOK}
        onOK={onConfirm}
        thirdButton={thirdButton}
        thirdButtonTitle={thirdButtonTitle}
        onThirdButtonClick={onThirdButtonClick}
        okTitle={okTitle ? okTitle : intl.formatMessage({ id: 'component.confirmpopup.yes' })}
        cancelTitle={
          thirdButton
            ? intl.formatMessage({ id: 'component.confirmpopup.cancel' })
            : intl.formatMessage({ id: 'component.confirmpopup.no' })
        }
      >
        <div className="px-3 py-3 confirm-popup-text">
          <label.titlexl>{content}</label.titlexl>
        </div>
      </Modal>
    </div>
  );
};

export { ConfirmPopup };
