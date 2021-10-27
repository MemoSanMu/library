import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';
import _extends from '@babel/runtime/helpers/esm/extends';

/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-29 10:54:25
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-26 11:54:14
 */

/**
 * 常规组件入口
 **/
import React, { useCallback, useState, useMemo } from 'react'; // Components

import Browser from './components/Browser';
import callee from './ImageGallery.callee';
import Card from './components/Card';
var defaultStyle = {
  cursor: 'zoom-in',
  width: 100,
  height: 80,
};

var GalleryPreview = function GalleryPreview(_ref) {
  var props = _extends({}, _ref);

  var imgcls = props.imgcls,
    _props$style = props.style,
    style = _props$style === void 0 ? {} : _props$style,
    src = props.src,
    _props$alt = props.alt,
    alt = _props$alt === void 0 ? '' : _props$alt,
    _onClick = props.onClick,
    forwardedRef = props.forwardedRef,
    onBrowsing = props.onBrowsing;

  var _useState = useState(),
    _useState2 = _slicedToArray(_useState, 2),
    currentImage = _useState2[0],
    setCurrentImage = _useState2[1];

  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    browsing = _useState4[0],
    setBrowsing = _useState4[1]; // 是否是调用方 控制预览

  var isBrowsingControlled = useMemo(function () {
    return props.hasOwnProperty('browsing');
  }, []);
  var imageRef = useCallback(function (node) {
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

  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    /*#__PURE__*/ React.createElement('img', {
      className: imgcls,
      style: _objectSpread(_objectSpread({}, defaultStyle), style),
      src: src,
      alt: alt,
      onClick: function onClick(e) {
        inBrowsing();
        typeof _onClick === 'function' && _onClick(e);
      },
      ref: imageRef,
    }),
    (props === null || props === void 0 ? void 0 : props.items) &&
      Array.isArray(props.items) &&
      props.items.length
      ? /*#__PURE__*/ React.createElement(
          Browser,
          _objectSpread(
            {
              browsing: isBrowsingControlled ? !!props.browsing : browsing,
              isPortal: true,
              destroyer: outBrowsing,
            },
            props
          )
        )
      : null
  );
}; // 常规组件 image展示触发后调用

var ImageGallery = GalleryPreview; // 命令式调用全屏画廊

ImageGallery.browsing = callee;
ImageGallery.Browsing = callee; // 大写别名
// 卡片画廊

ImageGallery.ImageGalleryCard = Card;
export default ImageGallery;
