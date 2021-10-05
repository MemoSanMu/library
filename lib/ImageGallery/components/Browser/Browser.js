'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectSpread2')
);

var _slicedToArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/slicedToArray')
);

var _objectWithoutProperties2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutProperties')
);

var _react = _interopRequireWildcard(require('react'));

var _ImageGallery = _interopRequireDefault(require('../ImageGallery'));

var _Portal = _interopRequireDefault(require('../Portal'));

var _excluded = ['destroyer', 'browsing', 'isPortal'];

var Browser = function Browser(_ref) {
  var _ref$destroyer = _ref.destroyer,
    destroyer = _ref$destroyer === void 0 ? function () {} : _ref$destroyer,
    browsing = _ref.browsing,
    _ref$isPortal = _ref.isPortal,
    isPortal = _ref$isPortal === void 0 ? false : _ref$isPortal,
    props = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    mounted = _useState2[0],
    setMounted = _useState2[1]; // 卸载

  var outBrowsing = function outBrowsing() {
    setMounted(false);
    destroyer && destroyer();
  };

  (0, _react.useEffect)(
    function () {
      browsing === true && setMounted(browsing);
    },
    [browsing]
  );
  return mounted
    ? isPortal
      ? /*#__PURE__*/ _react.default.createElement(
          _Portal.default,
          null,
          /*#__PURE__*/ _react.default.createElement(
            _ImageGallery.default,
            (0, _objectSpread2.default)(
              (0, _objectSpread2.default)({}, props),
              {},
              {
                outBrowsing: outBrowsing,
              }
            )
          )
        )
      : /*#__PURE__*/ _react.default.createElement(
          _ImageGallery.default,
          (0, _objectSpread2.default)(
            (0, _objectSpread2.default)({}, props),
            {},
            {
              outBrowsing: outBrowsing,
            }
          )
        )
    : null;
};

var _default = Browser;
exports.default = _default;
