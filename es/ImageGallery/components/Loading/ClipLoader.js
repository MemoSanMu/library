/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-24 16:40:06
 * @LastEditors: wangsen
 * @LastEditTime: 2021-09-28 19:50:08
 */
import React from 'react';
import { getPrefixCls, imageGallery } from '../../config/index';
import Portals from '../Portal';

var Loader = function Loader(_ref) {
  var _ref$loading = _ref.loading,
    loading = _ref$loading === void 0 ? false : _ref$loading,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? '35px' : _ref$size,
    _ref$color = _ref.color,
    color = _ref$color === void 0 ? '#000000' : _ref$color,
    prefixCls = _ref.prefixCls;

  var style = function style() {
    return {
      width: size,
      height: size,
      borderColor: ''.concat(color),
      borderBottomColor: 'transparent',
    };
  };

  return loading
    ? /*#__PURE__*/ React.createElement(
        Portals,
        {
          className: getPrefixCls(
            prefixCls,
            ''.concat(imageGallery, '-loading')
          ),
          elementType: 'div',
        },
        /*#__PURE__*/ React.createElement('span', {
          style: style(),
          className: getPrefixCls(prefixCls, 'loading-clip'),
        })
      )
    : null;
};

export default Loader;
