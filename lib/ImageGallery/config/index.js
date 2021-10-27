'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.defaultControllers =
  exports.imageGalleryCard =
  exports.imageGallery =
  exports.defaultController =
  exports.cardThumbnailsSlideWidth =
  exports.thumbnailsSlideWidth =
  exports.cardThumbnailsMaxLength =
  exports.thumbnailsMaxLength =
  exports.getPrefixCls =
  exports.wrapperCls =
  exports.rootPrefix =
    void 0;

/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-17 15:17:27
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-21 13:53:24
 */
var rootPrefix = 'lib';
exports.rootPrefix = rootPrefix;
var wrapperCls = 'image-gallery';
/**
 * @name: getPrefixCls 拼接前缀
 * @param {prefixCls} 前缀
 * @return {name} 类名
 */

exports.wrapperCls = wrapperCls;

var getPrefixCls = function getPrefixCls() {
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

exports.getPrefixCls = getPrefixCls;
var thumbnailsMaxLength = 9;
exports.thumbnailsMaxLength = thumbnailsMaxLength;
var cardThumbnailsMaxLength = 4; // 单个缩略图 的宽度 width+margin+border

exports.cardThumbnailsMaxLength = cardThumbnailsMaxLength;
var thumbnailsSlideWidth = 108;
exports.thumbnailsSlideWidth = thumbnailsSlideWidth;
var cardThumbnailsSlideWidth = 104; // 默认的控制样式初始值

exports.cardThumbnailsSlideWidth = cardThumbnailsSlideWidth;
var defaultController = {
  rotate: 0,
  scale: 1,
};
exports.defaultController = defaultController;
var imageGallery = 'image-gallery';
exports.imageGallery = imageGallery;
var imageGalleryCard = ''.concat(imageGallery, '-card'); // 默认控制显示操作区域按钮显示隐藏

exports.imageGalleryCard = imageGalleryCard;
var defaultControllers = {
  // 缩放按钮
  zoom: true,
  // 下载按钮
  download: true,
  // 旋转按钮
  rotate: true,
  // 删除按钮
  delete: true,
};
exports.defaultControllers = defaultControllers;
