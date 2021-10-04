'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.imageGalleryCard =
  exports.imageGallery =
  exports.defaultController =
  exports.cardThumbnailsSlideWidth =
  exports.thumbnailsSlideWidth =
  exports.cardThumbnailsMaxLength =
  exports.thumbnailsMaxLength =
  exports.getPrefixCls =
  exports.wrapperCls =
    void 0;

/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-17 15:17:27
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-02 17:01:53
 */
var rootPrefix = 'lib';
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
var imageGalleryCard = ''.concat(imageGallery, '-card');
exports.imageGalleryCard = imageGalleryCard;
