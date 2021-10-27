/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-17 15:17:27
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-21 13:53:24
 */
export var rootPrefix = 'lib';
export var wrapperCls = 'image-gallery';
/**
 * @name: getPrefixCls 拼接前缀
 * @param {prefixCls} 前缀
 * @return {name} 类名
 */

export var getPrefixCls = function getPrefixCls() {
  var prefixCls =
    arguments.length > 0 && arguments[0] !== undefined
      ? arguments[0]
      : rootPrefix;
  var name =
    arguments.length > 1 && arguments[1] !== undefined
      ? arguments[1]
      : wrapperCls;
  return ''.concat(prefixCls, '-').concat(name);
}; // 索引缩略图最大展示长度

export var thumbnailsMaxLength = 9;
export var cardThumbnailsMaxLength = 4; // 单个缩略图 的宽度 width+margin+border

export var thumbnailsSlideWidth = 108;
export var cardThumbnailsSlideWidth = 104; // 默认的控制样式初始值

export var defaultController = {
  rotate: 0,
  scale: 1,
};
export var imageGallery = 'image-gallery';
export var imageGalleryCard = ''.concat(imageGallery, '-card'); // 默认控制显示操作区域按钮显示隐藏

export var defaultControllers = {
  // 缩放按钮
  zoom: true,
  // 下载按钮
  download: true,
  // 旋转按钮
  rotate: true,
  // 删除按钮
  delete: true,
};
