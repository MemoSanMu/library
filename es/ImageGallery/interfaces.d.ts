export declare type Items = {
  src: string;
  alt?: string;
  title?: string;
};
export declare type Direction = string | 'left' | 'right';
export interface Configurations {
  zIndex?: number;
  initialSlide?: number;
  fade?: boolean;
  draggable?: boolean;
  beforeChange?: (oldIndex: number, newIndex: number) => void;
  afterChange?: (index: number) => void;
  onInit?: () => void;
  onReInit?: () => void;
}
export interface ImageGalleryProps {
  prefixCls?: string;
  thumbnailsSlideMobileCount?: number;
  items: Items[];
  zIndex?: number;
  showTitle?: boolean;
  initialSlide?: number;
  delCb?: (items: Items[]) => void;
  className?: string;
  configurations?: Configurations;
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
