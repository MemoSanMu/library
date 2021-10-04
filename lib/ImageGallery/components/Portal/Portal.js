'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _react = require('react');

var _reactDom = require('react-dom');

var Portals = function Portals(_ref) {
  var children = _ref.children,
    target = _ref.target,
    id = _ref.id,
    className = _ref.className,
    zIndex = _ref.zIndex,
    _ref$elementType = _ref.elementType,
    elementType = _ref$elementType === void 0 ? 'figure' : _ref$elementType;
  var context = target || document.body;
  var container = document.createElement(elementType);
  id && (container.id = id);
  className && (container.className = className);
  zIndex && (container.style.zIndex = zIndex);
  context.appendChild(container);
  (0, _react.useEffect)(function () {
    return function () {
      context.removeChild(container);
    };
  }, []);
  return /*#__PURE__*/ (0, _reactDom.createPortal)(children, container);
};

var _default = Portals;
exports.default = _default;
