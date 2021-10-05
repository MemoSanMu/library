'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _react = _interopRequireDefault(require('react'));

var _rcTooltip = _interopRequireDefault(require('rc-tooltip'));

var _config = require('../../config');

/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-26 16:21:32
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-05 10:40:25
 */
var Tooltip = function Tooltip(props) {
  var children = props.children,
    prefixCls = props.prefixCls,
    text = props.text,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'top' : _props$placement;
  return /*#__PURE__*/ _react.default.createElement(
    _rcTooltip.default,
    {
      placement: placement,
      overlayClassName: ''.concat(
        (0, _config.getPrefixCls)(
          prefixCls,
          ''.concat(_config.imageGallery, '-rc-tooltip')
        )
      ),
      overlay: /*#__PURE__*/ _react.default.createElement('span', null, text),
    },
    /*#__PURE__*/ _react.default.createElement('div', null, children)
  );
};

var _default = Tooltip;
exports.default = _default;
