/**
 * 常规组件入口
 **/
import React, { FC } from 'react';
import { ImageGalleryProps } from './interfaces';
import Card from './components/Card';
export interface GalleryProps extends ImageGalleryProps {
  imgcls?: string;
  style?: React.CSSProperties;
  src: string;
  alt?: string;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
  forwardedRef?: (node: HTMLImageElement) => void;
  browsing?: boolean;
  onBrowsing?: (flag: boolean) => void;
}
declare const GalleryPreview: FC<GalleryProps>;
declare type ImageGalleryType = typeof GalleryPreview & {
  browsing: (props: ImageGalleryProps) => void;
  Browsing: (props: ImageGalleryProps) => void;
  ImageGalleryCard: typeof Card;
};
declare const ImageGallery: ImageGalleryType;
export default ImageGallery;
