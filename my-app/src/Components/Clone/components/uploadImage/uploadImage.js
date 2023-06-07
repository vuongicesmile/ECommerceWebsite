import { Upload } from 'antd';
import { LoadingOutlined, PlusOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { getBase64 } from '@/e2e/extensionMethod';
import '../uploadImage/uploadImage.less';
import { useEffect, useLayoutEffect, useState } from 'react';
import CropImage from '@/components/CropImageComponent';
import { useIntl } from 'umi';
import { notification } from '@/components/Notification';
import { label } from '@/components/Label';
import removeSvg from './asset/remove.svg';
import { URL_API } from '@/e2e/configSystem';
import defaultIMG from './asset/defaultImg.svg'
import Modal from '../Popup';
const UploadSingleImage = (props) => {
  const {handlePreviewImg, logo, previewImage,folderImg} = props;
  const intl = useIntl();
  const [chooseImgFromDevice, setChooseImgFromDevice] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [openCrop, setOpenCrop] = useState(false);
  const [emptyImg, setEmptyImg] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [showPreviewImg, setShowPreviewImg] = useState(false);
  const handleBeforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      notification.warning(
        intl.formatMessage({
          id: 'pages.setting.hoteldefine.onlyuploadimage',
        }),
      );
    }

    return isJpgOrPng;
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setLoading(true);
        setOpenCrop(true);
      });
      return;
    }
  };
  const handleCancel = () => {
    setAvatar(null);
    setEmptyImg(true);
    handlePreviewImg(null);
  };
  const onPreview = () => {
    setShowPreviewImg(true);
  };

  const setCropAvatarImage = (img) => {
    setImageUrl(null);
    setAvatar(img);
    setLoading(false);
    setOpenCrop(false);
    setEmptyImg(false);
    handlePreviewImg(img);
    setChooseImgFromDevice(true);
  };
  return (
    <>
     <Modal
            height={'350px'}
            width={'350px'}
            visible={showPreviewImg}
            title={intl.formatMessage({
              id: 'pages.setting.hoteldefine.logo',
            })}
            children={
              <div className="uploader-wrapper">
       
                {chooseImgFromDevice ? (
                  <img src={previewImage ? previewImage : defaultIMG} className="uploader-img" />
                ) : (
                  <img
                    src={
                      previewImage
                        ? URL_API + `/assets/images/${folderImg}/`+ previewImage
                        : defaultIMG
                    }
                    className="uploader-img"
                  />
                )}
              </div>
            }
            onClose={() => {
              setShowPreviewImg(false);
            }}
            visibleOK={false}
            cancelTitle={intl.formatMessage({
              id: 'pages.setting.hoteldefine.ok',
              defaultMessage: 'OK',
            })}
          />
      <CropImage
        srcImg={imageUrl}
        onComplete={setCropAvatarImage}
        open={openCrop}
        close={() => setOpenCrop(false)}
      />
      <div className="upload ">
        <div className="upload-card ">
          <div className="upload-header">
            {label.titlesm({
              bold: 0,
              children: intl.formatMessage({
                id: 'pages.setting.hoteldefine.logo',
              }),
            })}
          </div>
          <Upload
            name="image"
            listType="picture-card"
            className="uploader avatar-uploader"
            action="/setting/hoteldefine"
            beforeUpload={handleBeforeUpload}
            onChange={handleChange}
            showUploadList={false}
          >
            {emptyImg ? (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8, opacity: '0.2' }}>
                  {label.titlesm({
                    bold: 0,
                    children: intl.formatMessage({
                      id: 'pages.setting.hoteldefine.selectfile',
                    }),
                  })}
                </div>
              </div>
            ) : avatar ? (
              <div className="uploader-wrap">
                <img src={avatar} alt="avt" className="uploader-wrap-img" />
              </div>
            ) : logo ? (
              <div className="uploader-wrap">
                <img
                  src={URL_API + `/assets/images/${folderImg}/` + logo}
                  alt="logo"
                  className="uploader-wrap-img"
                />
              </div>
            ) : (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8, opacity: '0.2' }}>
                  {label.titlesm({
                    bold: 0,
                    children: intl.formatMessage({
                      id: 'pages.setting.hoteldefine.selectfile',
                    }),
                  })}
                </div>
              </div>
            )}
          </Upload>
          <div className="operation-img">
            <EyeOutlined className="preview-img" onClick={onPreview} />
            <img className="remove-img" alt="remove" src={removeSvg} onClick={handleCancel} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadSingleImage;
