import React, { useCallback, useState, useRef, useEffect } from 'react';
import Modal from '@/components/Popup';
import getCroppedImg from './cropImage';
import Cropper from 'react-easy-crop';
import { label } from '@/components/Label';
import { buttonList } from '@/components/Button';
import { Slider } from 'antd';
import './index.less';
function CropImage({ srcImg, onComplete, close, open }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(4 / 4);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(srcImg, croppedAreaPixels, rotation);
      onComplete(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  useEffect(() => {
    if (!open) {
      setCrop({ x: 0, y: 0 });
      setRotation(0);
      setZoom(1);
      setCroppedAreaPixels(null);
    }
  }, [open]);
  return (
    <Modal
      onOK={showCroppedImage}
      onClose={close}
      className="CropImage "
      visible={open}
      size={'m'}
      groupButton={
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <label.titlexl>Zoom</label.titlexl>
          <Slider
            style={{ marginLeft: '20px', width: '150px' }}
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(e) => setZoom(e)}
          ></Slider>
          <label.titlexl>Rotate</label.titlexl>
          <Slider
            style={{ marginLeft: '20px', width: '150px' }}
            value={rotation}
            min={1}
            max={360}
            step={1}
            onChange={(e) => setRotation(e)}
          ></Slider>
          <buttonList.submit onClick={showCroppedImage}></buttonList.submit>
        </div>
      }
      title="Crop Image"
    >
      <div className="CropImageContent">
        <Cropper
          image={srcImg}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
    </Modal>
  );
}

export default CropImage;
