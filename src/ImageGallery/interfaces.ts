export type Items = {
  src: string;
};

export type Direction = string | 'left' | 'right';

export interface ImageGalleryProps {
  prefixCls?: string;
  thumbnailsSlideMobileCount?: number; // 缩略图可滚动条数
  items: Items[];
  initialSlide?: number; // 第一张幻灯片的索引
  delCb?: (items: Items[]) => {}; // 删除后的回掉
}

export interface Controller {
  rotate: number;
  scale: number;
}

export type TooltipPlacement =
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
