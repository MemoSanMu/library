/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-17 15:17:27
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-21 13:53:24
 */
export const rootPrefix = 'lib';

export const wrapperCls = 'image-gallery';

/**
 * @name: getPrefixCls 拼接前缀
 * @param {prefixCls} 前缀
 * @return {name} 类名
 */
export const getPrefixCls = (
  prefixCls: string = rootPrefix,
  name: string = wrapperCls,
) => {
  return `${prefixCls}-${name}`;
};

// 索引缩略图最大展示长度
export const thumbnailsMaxLength = 9;
export const cardThumbnailsMaxLength = 4;

// 单个缩略图 的宽度 width+margin+border
export const thumbnailsSlideWidth = 108;
export const cardThumbnailsSlideWidth = 104;

// 默认的控制样式初始值
export const defaultController = {
  rotate: 0,
  scale: 1,
};

export const imageGallery = `image-gallery`;

export const imageGalleryCard = `${imageGallery}-card`;

// 默认控制显示操作区域按钮显示隐藏
export const defaultControllers = {
  // 缩放按钮
  zoom: true,
  // 下载按钮
  download: true,
  // 旋转按钮
  rotate: true,
  // 删除按钮
  delete: true,
};
