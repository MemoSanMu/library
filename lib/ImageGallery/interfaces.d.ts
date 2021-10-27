export declare type Items = {
  src: string;
  alt?: string;
  title?: string;
};
export declare type Direction = string | 'left' | 'right';
export declare type Controllers = {
  zoom?: boolean;
  download?: boolean;
  rotate?: boolean;
  delete?: boolean;
};
export interface Configurations {
  initialSlide?: number;
  fade?: boolean;
  draggable?: boolean;
  beforeChange?: (oldIndex: number, newIndex: number) => void;
  afterChange?: (index: number) => void;
  onInit?: () => void;
  onReInit?: () => void;
}
export interface ImageGalleryProps {
  thumbnailsSlideMobileCount?: number;
  items: Items[];
  zIndex?: number;
  showTitle?: boolean;
  initialSlide?: number;
  delCb?: (items: Items[]) => void;
  className?: string;
  configurations?: Configurations;
  controllers?: Controllers;
}
export interface Controller {
  rotate: number;
  scale: number;
}
export declare type TooltipPlacement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';
export interface ThumbnailsControl {
  leftDisable: boolean;
  rightDisable: boolean;
}
