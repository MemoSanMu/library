'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _react = _interopRequireDefault(require('react'));

var _index = require('../../config/index');

var _Portal = _interopRequireDefault(require('../Portal'));

/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-24 16:40:06
 * @LastEditors: wangsen
 * @LastEditTime: 2021-09-28 19:50:08
 */
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
    ? /*#__PURE__*/ _react.default.createElement(
        _Portal.default,
        {
          className: (0, _index.getPrefixCls)(
            prefixCls,
            ''.concat(_index.imageGallery, '-loading')
          ),
          elementType: 'div',
        },
        /*#__PURE__*/ _react.default.createElement('span', {
          style: style(),
          className: (0, _index.getPrefixCls)(prefixCls, 'loading-clip'),
        })
      )
    : null;
};

var _default = Loader;
exports.default = _default;
