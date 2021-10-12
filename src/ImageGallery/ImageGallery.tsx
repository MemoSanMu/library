/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-29 10:54:25
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-11 15:07:21
 */

/**
 * 常规组件入口
 **/

import React, { FC, useCallback, useState, useMemo } from 'react';
// Components
import Browser from './components/Browser';
import callee from './ImageGallery.callee';
import { ImageGalleryProps } from './interfaces';
import Card from './components/Card';

const defaultStyle = {
  cursor: 'pointer',
  width: 100,
  height: 80,
};

export interface GalleryProps extends ImageGalleryProps {
  className?: string;
  style?: React.CSSProperties; // defaultStyle
  src: string;
  alt?: string;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
  forwardedRef?: (node: HTMLImageElement) => void;
  browsing?: boolean; // 受控属性 -- 控制是否进入查看模式 传此参数 必传onBrowsing函数主动控制预览
  onBrowsing?: (flag: boolean) => void; // 在显示/隐藏时调用, 会回传显示状态
}

const GalleryPreview: FC<GalleryProps> = ({ ...props }) => {
  const {
    className,
    style = {},
    src,
    alt = '',
    onClick,
    forwardedRef,
    onBrowsing,
  } = props;

  const [currentImage, setCurrentImage] = useState<HTMLImageElement>();
  const [browsing, setBrowsing] = useState<boolean>(false);

  // 是否是调用方 控制预览
  const isBrowsingControlled = useMemo<boolean>(
    () => props.hasOwnProperty('browsing'),
    [],
  );

  const imageRef = useCallback((node) => {
    if (node !== undefined) {
      setCurrentImage(node);
      typeof forwardedRef === 'function' && forwardedRef(node);
    }
  }, []);

  /* 切换查看状态 */
  const inBrowsing = () => {
    isBrowsingControlled
      ? typeof onBrowsing === 'function' && onBrowsing(true)
      : setBrowsing(true);
  };
  const outBrowsing = () => {
    isBrowsingControlled
      ? typeof onBrowsing === 'function' && onBrowsing(false)
      : setBrowsing(false);
  };
  return (
    <>
      {/*图片*/}
      <img
        className={className}
        style={{ ...defaultStyle, ...style }}
        src={src}
        alt={alt}
        onClick={(e) => {
          inBrowsing();
          typeof onClick === 'function' && onClick(e);
        }}
        ref={imageRef}
      />

      {/* 预览画廊 */}
      <Browser
        browsing={isBrowsingControlled ? !!props.browsing : browsing}
        isPortal={true}
        destroyer={outBrowsing}
        {...props}
      />
    </>
  );
};

type ImageGalleryType = typeof GalleryPreview & {
  browsing: (props: ImageGalleryProps) => void;
  Browsing: (props: ImageGalleryProps) => void;
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
