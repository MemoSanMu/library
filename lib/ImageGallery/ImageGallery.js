'use strict';

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectSpread2')
);

var _slicedToArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/slicedToArray')
);

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
);

var _react = _interopRequireWildcard(require('react'));

var _Browser = _interopRequireDefault(require('./components/Browser'));

var _ImageGallery = _interopRequireDefault(require('./ImageGallery.callee'));

var _Card = _interopRequireDefault(require('./components/Card'));

/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-29 10:54:25
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-08 15:28:37
 */

/**
 * 常规组件入口
 **/
// Components
var defaultStyle = {
  cursor: 'pointer',
  width: 100,
  height: 80,
};

var GalleryPreview = function GalleryPreview(_ref) {
  var props = (0, _extends2.default)({}, _ref);
  var className = props.className,
    _props$style = props.style,
    style = _props$style === void 0 ? {} : _props$style,
    src = props.src,
    _props$alt = props.alt,
    alt = _props$alt === void 0 ? '' : _props$alt,
    _onClick = props.onClick,
    forwardedRef = props.forwardedRef,
    onBrowsing = props.onBrowsing;

  var _useState = (0, _react.useState)(),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    currentImage = _useState2[0],
    setCurrentImage = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    browsing = _useState4[0],
    setBrowsing = _useState4[1]; // 是否是调用方 控制预览

  var isBrowsingControlled = (0, _react.useMemo)(function () {
    return props.hasOwnProperty('browsing');
  }, []);
  var imageRef = (0, _react.useCallback)(function (node) {
    if (node !== undefined) {
      setCurrentImage(node);
      typeof forwardedRef === 'function' && forwardedRef(node);
    }
  }, []);
  /* 切换查看状态 */

  var inBrowsing = function inBrowsing() {
    isBrowsingControlled
      ? typeof onBrowsing === 'function' && onBrowsing(true)
      : setBrowsing(true);
  };

  var outBrowsing = function outBrowsing() {
    isBrowsingControlled
      ? typeof onBrowsing === 'function' && onBrowsing(false)
      : setBrowsing(false);
  };

  return /*#__PURE__*/ _react.default.createElement(
    _react.default.Fragment,
    null,
    /*#__PURE__*/ _react.default.createElement('img', {
      className: className,
      style: (0, _objectSpread2.default)(
        (0, _objectSpread2.default)({}, defaultStyle),
        style
      ),
      src: src,
      alt: alt,
      onClick: function onClick(e) {
        inBrowsing();
        typeof _onClick === 'function' && _onClick(e);
      },
      ref: imageRef,
    }),
    /*#__PURE__*/ _react.default.createElement(
      _Browser.default,
      (0, _objectSpread2.default)(
        {
          browsing: isBrowsingControlled ? !!props.browsing : browsing,
          isPortal: true,
          destroyer: outBrowsing,
        },
        props
      )
    )
  );
}; // 常规组件 image展示触发后调用

var ImageGallery = GalleryPreview; // 命令式调用全屏画廊

ImageGallery.browsing = _ImageGallery.default;
ImageGallery.Browsing = _ImageGallery.default; // 大写别名
// 卡片画廊

ImageGallery.ImageGalleryCard = _Card.default;
var _default = ImageGallery;
exports.default = _default;
