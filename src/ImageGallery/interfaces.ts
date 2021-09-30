export type Items = {
  src: string; // 图片 Url，与 img 标签的 src 属性相同
  alt?: string; // 图片占位文字，与 img 标签的 alt 属性相同
};

export type Direction = string | 'left' | 'right';

export interface ImageGalleryProps {
  prefixCls?: string;
  thumbnailsSlideMobileCount?: number; // 缩略图可滚动条数
  items: Items[];
  zIndex?: number; // 优先级
  showTitle?: boolean; // 是否展示图片标题 default: true； 默认取Items[] alt ｜ src
  initialSlide?: number; // 第一张幻灯片的索引,用于指定打开后的默认页
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

export interface ThumbnailsControl {
  leftDisable: boolean;
  rightDisable: boolean;
}
