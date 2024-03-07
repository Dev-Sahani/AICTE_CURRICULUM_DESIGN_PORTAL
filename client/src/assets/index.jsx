import React from 'react';

import ChatBubbleImage from "./chatBubble.svg";
import AddImage from "./Add.png";
import CompletedImage from "./Completed.png";
import DoubleArrowImage from "./DoubleArrow.png";
import DownloadImage from "./Download.svg";
import LogOutImage from "./LogOut.svg";
import FireImage from "./Fire.png";
import IITBLogo from "./iitblogo.png";
import Image from "./image.png";
import LogoImage from "./logo.png";
import LogsImage from "./logs.svg";
import PersonAddImage from "./personAdd.svg";
import PlusImage from "./Plus.png";
import ProgressImage from "./Progress.png";
import SearchImage from "./Search.png";
import CloseImage from "./CloseImage.png"
import ExpandDown from "./expand-down.png"

const imageMap = {
  ChatBubbleImage,
  AddImage,
  CompletedImage,
  DoubleArrowImage,
  DownloadImage,
  LogOutImage,
  FireImage,
  IITBLogo,
  Image,
  LogoImage,
  LogsImage,
  PersonAddImage,
  PlusImage,
  ProgressImage,
  SearchImage,
  CloseImage,
  ExpandDown,
};

const ImageComponent = ({ imageName, alt, className, ...others}) => {
  const ImageSrc = imageMap[imageName];

  if (!ImageSrc) {
    console.error(`Image ${imageName} not found`);
    // eslint-disable-next-line
    return <img src='' alt='No Such Image' />
  }

  return <img className={className} src={ImageSrc} alt={alt} {...others} />;
};

export default ImageComponent;
