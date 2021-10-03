/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-29 10:54:25
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-03 17:32:12
 */

/**
 * 常规组件入口
 **/

import React, { FC, useCallback, useState } from 'react';
// Components
import Browser from './components/Browser';
import callee from './ImageGallery.callee';
import { ImageGalleryProps } from './interfaces';
import Card from './components/Card';
import './styles/index.less';

interface GalleryProps extends ImageGalleryProps {
  className?: string;
  style?: React.CSSProperties;
  src: string;
  alt?: string;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
  forwardedRef?: (node: HTMLImageElement) => void;
}

const ImageGallery: FC<GalleryProps> = ({ ...props }) => {
  const { className, style = {}, src, alt = '', onClick, forwardedRef } = props;

  const [currentImage, setCurrentImage] = useState<HTMLImageElement>();
  const [browsing, setBrowsing] = useState<boolean>(false);

  const imageRef = useCallback((node) => {
    if (node !== undefined) {
      setCurrentImage(node);
      typeof forwardedRef === 'function' && forwardedRef(node);
    }
  }, []);

  /* 切换查看状态 */
  const inBrowsing = () => {
    setBrowsing(true);
  };
  const outBrowsing = () => {
    setBrowsing(false);
  };
  return (
    <>
      {/*图片*/}
      <img
        className={className}
        style={{ cursor: 'pointer', ...style }}
        src={src}
        alt={alt}
        onClick={(e) => {
          inBrowsing();
          typeof onClick === 'function' && onClick(e);
        }}
        ref={imageRef}
        // {...restProps}
      />

      {/* 预览画廊 */}
      <Browser browsing={browsing} destroyer={outBrowsing} {...props} />
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
// const forwardedImageGallery: any = Card;

// 命令式调用全屏画廊
forwardedImageGallery.browsing = callee;
forwardedImageGallery.Browsing = callee; // Alias browsing

export { Card as ImageGalleryCard };
export default forwardedImageGallery;
