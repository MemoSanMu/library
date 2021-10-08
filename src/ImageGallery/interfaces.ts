/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-30 10:20:02
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-08 15:52:40
 */
export type Items = {
  src: string; // 图片 Url，与 img 标签的 src 属性相同
  alt?: string; // 图片占位文字，与 img 标签的 alt 属性相同
  title?: string; // 头部图片名称优先取title｜src
};

export type Direction = string | 'left' | 'right';

export interface Configurations {
  zIndex?: number; // 优先级
  initialSlide?: number; // 第一张幻灯片的索引,用于指定打开后的默认页
  fade?: boolean; // 切换动画方式 default false,卡片模式可使用，全屏模式谨慎使用（使用后将无法使用图片拖拽功能）
  draggable?: boolean; // 禁止拖动swipe 切换， card 默认true；全屏预览默认false
  beforeChange?: (oldIndex: number, newIndex: number) => void; // 切换前钩子 Description: Index change callback. `(oldIndex, newIndex) => ...`
  afterChange?: (index: number) => void; // 切换后钩子 Description: Index change callback. `index => ...`
  onInit?: () => void; // Description: componentWillMount callback. `() => void`
  onReInit?: () => void; // Description: componentDidUpdate callback. `() => void`
}

export interface ImageGalleryProps {
  prefixCls?: string;
  thumbnailsSlideMobileCount?: number; // 缩略图可滚动条数 默认一条
  items: Items[];
  zIndex?: number; // 优先级
  showTitle?: boolean; // 是否展示图片标题 default: true； 默认取Items[] alt ｜ src
  initialSlide?: number; // 第一张幻灯片的索引,用于指定打开后的默认页
  delCb?: (items: Items[]) => void; // 删除后的回掉
  className?: string; // 容器类名
  configurations?: Configurations;
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
