import { useEffect } from 'react';
import { createPortal } from 'react-dom';

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
  useEffect(function () {
    return function () {
      context.removeChild(container);
    };
  }, []);
  return /*#__PURE__*/ createPortal(children, container);
};

export default Portals;
