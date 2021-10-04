'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _react = _interopRequireDefault(require('react'));

var Svg = function Svg(props) {
  var children = props.children,
    width = props.width,
    height = props.height,
    id = props.id;
  return /*#__PURE__*/ _react.default.createElement(
    'svg',
    {
      width: width,
      height: height,
      viewBox: '0 0 16 16',
      version: '1.1',
      xmlns: 'http://www.w3.org/2000/svg',
      xmlnsXlink: 'http://www.w3.org/1999/xlink',
    },
    /*#__PURE__*/ _react.default.createElement('title', null, id),
    /*#__PURE__*/ _react.default.createElement(
      'g',
      {
        id: id,
        stroke: 'none',
        strokeWidth: '1',
        fill: 'none',
        fillRule: 'evenodd',
      },
      children
    )
  );
};

var _default = Svg;
exports.default = _default;
