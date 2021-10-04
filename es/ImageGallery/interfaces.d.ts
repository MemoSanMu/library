export declare type Items = {
  src: string;
  alt?: string;
};
export declare type Direction = string | 'left' | 'right';
export interface ImageGalleryProps {
  prefixCls?: string;
  thumbnailsSlideMobileCount?: number;
  items: Items[];
  zIndex?: number;
  showTitle?: boolean;
  initialSlide?: number;
  delCb?: (items: Items[]) => {};
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
