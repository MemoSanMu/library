'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectSpread2')
);

var _react = _interopRequireDefault(require('react'));

var _reactSlick = _interopRequireDefault(require('react-slick'));

/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-17 19:18:09
 * @LastEditors: wangsen
 * @LastEditTime: 2021-09-30 16:23:47
 */
var SliderWrapper = function SliderWrapper(props) {
  return /*#__PURE__*/ _react.default.createElement(
    _reactSlick.default,
    (0, _objectSpread2.default)(
      {
        ref: props.sliderWrapper,
      },
      props.settings
    ),
    props.children
  );
};

var _default = SliderWrapper;
exports.default = _default;
