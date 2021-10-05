'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _react = _interopRequireDefault(require('react'));

var _config = require('@/ImageGallery/config');

var _Portal = _interopRequireDefault(
  require('@/ImageGallery/components/Portal')
);

/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-24 16:40:06
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-05 10:50:49
 */
var ClipLoader = function ClipLoader(_ref) {
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
          className: (0, _config.getPrefixCls)(
            prefixCls,
            ''.concat(_config.imageGallery, '-loading')
          ),
          elementType: 'div',
        },
        /*#__PURE__*/ _react.default.createElement('span', {
          style: style(),
          className: (0, _config.getPrefixCls)(prefixCls, 'loading-clip'),
        })
      )
    : null;
};

var _default = ClipLoader;
exports.default = _default;
