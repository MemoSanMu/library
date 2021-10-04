/**
 * 常规组件入口
 **/
import React, { FC } from 'react';
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
declare const GalleryPreview: FC<GalleryProps>;
declare type ImageGalleryType = typeof GalleryPreview & {
  browsing: (props: GalleryProps) => void;
  Browsing: (props: GalleryProps) => void;
  ImageGalleryCard: typeof Card;
};
declare const ImageGallery: ImageGalleryType;
export default ImageGallery;
