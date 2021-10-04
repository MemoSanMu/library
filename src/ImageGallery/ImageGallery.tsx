/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-29 10:54:25
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-04 19:40:30
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

interface GalleryProps extends ImageGalleryProps {
  className?: string;
  style?: React.CSSProperties;
  src: string;
  alt?: string;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
  forwardedRef?: (node: HTMLImageElement) => void;
}

const GalleryPreview: FC<GalleryProps> = ({ ...props }) => {
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
      <Browser
        browsing={browsing}
        isPortal={true}
        destroyer={outBrowsing}
        {...props}
      />
    </>
  );
};

type ImageGalleryType = typeof GalleryPreview & {
  browsing: (props: GalleryProps) => void;
  Browsing: (props: GalleryProps) => void;
  ImageGalleryCard: typeof Card;
};

// 常规组件 image展示触发后调用
const ImageGallery = GalleryPreview as ImageGalleryType;

// 命令式调用全屏画廊
ImageGallery.browsing = callee;
ImageGallery.Browsing = callee; // 大写别名

// 卡片画廊
ImageGallery.ImageGalleryCard = Card;

export default ImageGallery;
