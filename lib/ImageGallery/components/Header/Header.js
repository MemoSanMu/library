'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
);

var _react = _interopRequireDefault(require('react'));

var _Tooltip = _interopRequireDefault(require('../Tooltip'));

var _index = require('../../config/index');

/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-30 11:53:54
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-05 12:17:35
 */
var Header = function Header(_ref) {
  var props = (0, _extends2.default)({}, _ref);
  var currentSlider = props.currentSlider,
    showTitle = props.showTitle,
    prefixCls = props.prefixCls,
    children = props.children;
  return /*#__PURE__*/ _react.default.createElement(
    'header',
    {
      className: (0, _index.getPrefixCls)(
        prefixCls,
        ''.concat(_index.imageGallery, '-header')
      ),
    },
    /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        className: (0, _index.getPrefixCls)(
          prefixCls,
          ''.concat(_index.imageGallery, '-header-alt')
        ),
      },
      showTitle &&
        /*#__PURE__*/ _react.default.createElement(
          _Tooltip.default,
          {
            text: currentSlider.alt || currentSlider.src,
            placement: 'bottom',
          },
          /*#__PURE__*/ _react.default.createElement(
            'p',
            {
              className: (0, _index.getPrefixCls)(
                prefixCls,
                ''.concat(_index.imageGallery, '-header-title')
              ),
            },
            currentSlider.alt || currentSlider.src
          )
        )
    ),
    children
  );
};

var _default = Header;
exports.default = _default;
