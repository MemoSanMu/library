'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _react = _interopRequireWildcard(require('react'));

var _classnames = _interopRequireDefault(require('classnames'));

var _config = require('../../config');

/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-27 16:13:57
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-05 10:40:10
 */
var Toast = function Toast(props) {
  var prefixCls = props.prefixCls,
    show = props.show,
    sacleProgress = props.sacleProgress;
  var toastContent = (0, _react.useCallback)(
    function () {
      return /*#__PURE__*/ _react.default.createElement(
        'div',
        {
          className: (0, _config.getPrefixCls)(prefixCls, 'toast-content'),
        },
        /*#__PURE__*/ _react.default.createElement(
          'span',
          null,
          ''.concat(sacleProgress * 100, '%')
        )
      );
    },
    [sacleProgress]
  );
  var messageCls = (0, _classnames.default)(
    (0, _config.getPrefixCls)(
      prefixCls,
      ''.concat(_config.imageGallery, '-toast')
    ),
    {
      show: show,
    }
  );
  return /*#__PURE__*/ _react.default.createElement(
    'div',
    {
      className: messageCls,
    },
    toastContent()
  );
};

var _default = Toast;
exports.default = _default;
