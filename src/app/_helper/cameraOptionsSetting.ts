import { Camera, CameraOptions } from "@ionic-native/Camera/ngx";

export function CameraOptionsSetting(isCamera?: boolean, camera?: Camera) {

  let sourceType: any
  if (!isCamera) {
    sourceType = camera.PictureSourceType.PHOTOLIBRARY;
  } else {
    sourceType = camera.PictureSourceType.CAMERA;
  }

  //set options of camera
  const caremaOptions: CameraOptions = {
    quality: 50,
    saveToPhotoAlbum: false,
    correctOrientation: true,
    targetHeight: 1000,
    targetWidth: 1000,
    destinationType: camera.DestinationType.DATA_URL,//
    encodingType: camera.EncodingType.JPEG,
    sourceType: sourceType,
    mediaType: camera.MediaType.PICTURE
  }

  return caremaOptions;
}