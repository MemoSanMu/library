'use strict';

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectSpread2')
);

var _react = _interopRequireDefault(require('react'));

var _reactDom = _interopRequireWildcard(require('react-dom'));

var _Browser = _interopRequireDefault(
  require('@/ImageGallery/components/Browser')
);

/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-29 10:26:07
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-05 10:40:58
 */

/**
 * 命令式调用组件入口
 **/
// Components
// 弹窗对象
var RENDER = {
  CONTAINER: document.body,
  PORTAL: null,
  CONTENT: null,
}; // 主动触发 调用函数

var callee = function callee(props) {
  RENDER.PORTAL = document.createElement('figure'); // 入口

  RENDER.CONTENT = document.createElement('div'); // 内容

  RENDER.CONTAINER.appendChild(RENDER.PORTAL);
  RENDER.PORTAL.appendChild(RENDER.CONTENT); // DEL PORTAL

  var destroyer = function destroyer() {
    if (RENDER.PORTAL) {
      RENDER.CONTAINER.removeChild(RENDER.PORTAL);
      RENDER.PORTAL = null;
    }

    RENDER.CONTENT && (RENDER.CONTENT = null);
  }; // Mount content

  _reactDom.default.render(
    /*#__PURE__*/ _react.default.createElement(
      _Browser.default,
      (0, _objectSpread2.default)(
        {
          destroyer: destroyer,
          browsing: true,
        },
        props
      )
    ),
    RENDER.CONTENT
  ); // 创建画廊到body

  /*#__PURE__*/
  (0, _reactDom.createPortal)(RENDER.CONTENT, RENDER.PORTAL);
};

var _default = callee;
exports.default = _default;
