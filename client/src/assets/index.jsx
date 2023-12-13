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
};

const ImageComponent = ({ imageName, alt, w, h, both}) => {
  console.log(imageMap);
  let width, height;
  if(both) {
    width = `w-${both}`; height = `h-${both}`
  } else {
    width = height = "w-auto";
    if(w) width = `w-${w}`;
    if(h) height = `h-${h}`;
  }
  const ImageSrc = imageMap[imageName];

  if (!ImageSrc) {
    console.error(`Image ${imageName} not found`);
    // eslint-disable-next-line
    return <img src='' alt='No Such Image' />
  }

  return <img className={`${width} ${height}`} src={ImageSrc} alt={alt} />;
};

export default ImageComponent;
