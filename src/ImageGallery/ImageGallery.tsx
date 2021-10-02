/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-29 10:54:25
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-02 16:49:00
 */

/**
 * 常规组件入口
 **/

import React, { FC } from 'react';
// Components
import Browser from './components/Browser';
import callee from './ImageGallery.callee';
import { ImageGalleryProps } from './interfaces';
import Card from './components/Card';
import './styles/index.less';

interface GalleryProps extends ImageGalleryProps {}

const ImageGallery: FC<GalleryProps> = ({ ...props }) => {
  return (
    <>
      <img src="" alt="" />
      <Browser browsing={true} {...props} />
    </>
  );
};

// interface ForwardedImageGallery extends GalleryProps {
//   // coverRef?: null; //   后续在看是否需要传入ref
//   browsing?: (props: ImageGalleryProps) => void;
//   Browsing?: (props: ImageGalleryProps) => void;
// }

// 常规组件
const forwardedImageGallery: any = ImageGallery;

// 命令式调用全屏画廊
forwardedImageGallery.browsing = callee;
forwardedImageGallery.Browsing = callee; // Alias browsing
export default forwardedImageGallery;
