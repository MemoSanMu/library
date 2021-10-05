import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';
import _objectWithoutProperties from '@babel/runtime/helpers/esm/objectWithoutProperties';
var _excluded = ['destroyer', 'browsing', 'isPortal'];

/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-30 10:20:19
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-05 10:32:16
 */
import React, { useState, useEffect } from 'react';
import ImageGallery from '../ImageGallery';
import Portal from '../Portal';

var Browser = function Browser(_ref) {
  var _ref$destroyer = _ref.destroyer,
    destroyer = _ref$destroyer === void 0 ? function () {} : _ref$destroyer,
    browsing = _ref.browsing,
    _ref$isPortal = _ref.isPortal,
    isPortal = _ref$isPortal === void 0 ? false : _ref$isPortal,
    props = _objectWithoutProperties(_ref, _excluded);

  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    mounted = _useState2[0],
    setMounted = _useState2[1]; // 卸载

  var outBrowsing = function outBrowsing() {
    setMounted(false);
    destroyer && destroyer();
  };

  useEffect(
    function () {
      browsing === true && setMounted(browsing);
    },
    [browsing]
  );
  return mounted
    ? isPortal
      ? /*#__PURE__*/ React.createElement(
          Portal,
          null,
          /*#__PURE__*/ React.createElement(
            ImageGallery,
            _objectSpread(
              _objectSpread({}, props),
              {},
              {
                outBrowsing: outBrowsing,
              }
            )
          )
        )
      : /*#__PURE__*/ React.createElement(
          ImageGallery,
          _objectSpread(
            _objectSpread({}, props),
            {},
            {
              outBrowsing: outBrowsing,
            }
          )
        )
    : null;
};

export default Browser;
