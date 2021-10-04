'use strict';

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
Object.defineProperty(exports, 'ImageGalleryCard', {
  enumerable: true,
  get: function get() {
    return _Card.default;
  },
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
 * @LastEditTime: 2021-10-04 17:46:38
 */

/**
 * 常规组件入口
 **/
// Components
var ImageGallery = function ImageGallery(_ref) {
  var props = (0, _extends2.default)({}, _ref);
  var className = props.className,
    _props$style = props.style,
    style = _props$style === void 0 ? {} : _props$style,
    src = props.src,
    _props$alt = props.alt,
    alt = _props$alt === void 0 ? '' : _props$alt,
    _onClick = props.onClick,
    forwardedRef = props.forwardedRef;

  var _useState = (0, _react.useState)(),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    currentImage = _useState2[0],
    setCurrentImage = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    browsing = _useState4[0],
    setBrowsing = _useState4[1];

  var imageRef = (0, _react.useCallback)(function (node) {
    if (node !== undefined) {
      setCurrentImage(node);
      typeof forwardedRef === 'function' && forwardedRef(node);
    }
  }, []);
  /* 切换查看状态 */

  var inBrowsing = function inBrowsing() {
    setBrowsing(true);
  };

  var outBrowsing = function outBrowsing() {
    setBrowsing(false);
  };

  return /*#__PURE__*/ _react.default.createElement(
    _react.default.Fragment,
    null,
    /*#__PURE__*/ _react.default.createElement('img', {
      className: className,
      style: (0, _objectSpread2.default)(
        {
          cursor: 'pointer',
        },
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
          browsing: browsing,
          isPortal: true,
          destroyer: outBrowsing,
        },
        props
      )
    )
  );
}; // interface ForwardedImageGallery extends GalleryProps {
//   // coverRef?: null; //   后续在看是否需要传入ref
//   browsing?: (props: ImageGalleryProps) => void;
//   Browsing?: (props: ImageGalleryProps) => void;
// }
// 常规组件

var forwardedImageGallery = ImageGallery; // const forwardedImageGallery: any = Card;
// 命令式调用全屏画廊

forwardedImageGallery.browsing = _ImageGallery.default;
forwardedImageGallery.Browsing = _ImageGallery.default; // Alias browsing

var _default = forwardedImageGallery;
exports.default = _default;
