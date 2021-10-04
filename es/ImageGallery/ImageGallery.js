import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';
import _extends from '@babel/runtime/helpers/esm/extends';

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
import React, { useCallback, useState } from 'react'; // Components

import Browser from './components/Browser';
import callee from './ImageGallery.callee';
import Card from './components/Card';

var ImageGallery = function ImageGallery(_ref) {
  var props = _extends({}, _ref);

  var className = props.className,
    _props$style = props.style,
    style = _props$style === void 0 ? {} : _props$style,
    src = props.src,
    _props$alt = props.alt,
    alt = _props$alt === void 0 ? '' : _props$alt,
    _onClick = props.onClick,
    forwardedRef = props.forwardedRef;

  var _useState = useState(),
    _useState2 = _slicedToArray(_useState, 2),
    currentImage = _useState2[0],
    setCurrentImage = _useState2[1];

  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    browsing = _useState4[0],
    setBrowsing = _useState4[1];

  var imageRef = useCallback(function (node) {
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

  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    /*#__PURE__*/ React.createElement('img', {
      className: className,
      style: _objectSpread(
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
    /*#__PURE__*/ React.createElement(
      Browser,
      _objectSpread(
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

forwardedImageGallery.browsing = callee;
forwardedImageGallery.Browsing = callee; // Alias browsing

export { Card as ImageGalleryCard };
export default forwardedImageGallery;
