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

var _rcNotification = _interopRequireDefault(require('rc-notification'));

var _config = require('../../config');

/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-26 16:21:32
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-05 10:39:26
 */
var messageInstance;
var key = 1;

var getRCNotificationInstance = function getRCNotificationInstance(
  props,
  callback
) {
  var className = props.className,
    maxCount = props.maxCount;
  var target = props.key || key++; // called when notice close

  var destroy = function destroy(messageKey) {
    if (messageInstance) {
      if (messageKey) {
        var _messageInstance = messageInstance,
          removeNotice = _messageInstance.removeNotice;
        removeNotice(messageKey);
      } else {
        var _messageInstance2 = messageInstance,
          _destroy = _messageInstance2.destroy;

        _destroy();

        messageInstance = null;
      }
    }
  }; // 已经创建，直接追加message

  if (messageInstance) {
    return callback(
      messageInstance,
      (0, _objectSpread2.default)(
        (0, _objectSpread2.default)({}, props),
        {},
        {
          key: target,
        }
      ),
      destroy
    );
  } // 创建message

  return _rcNotification.default.newInstance(
    {
      className: className,
      maxCount: maxCount,
    },
    function (notification) {
      messageInstance = notification; // 保存notification

      callback(
        messageInstance,
        (0, _objectSpread2.default)(
          (0, _objectSpread2.default)({}, props),
          {},
          {
            key: target,
          }
        ),
        destroy
      );
    }
  );
};

var getRCNoticeProps = function getRCNoticeProps(_ref, _onClose) {
  var duration = _ref.duration,
    icon = _ref.icon,
    prefixCls = _ref.prefixCls,
    content = _ref.content,
    key = _ref.key;
  return {
    duration: duration,
    key: key,
    content: /*#__PURE__*/ _react.default.createElement(
      'span',
      {
        className: ''.concat(
          (0, _config.getPrefixCls)(
            prefixCls,
            ''.concat(_config.imageGallery, '-rc-notification-notice-content')
          )
        ),
      },
      icon,
      /*#__PURE__*/ _react.default.createElement(
        'span',
        {
          className: ''
            .concat(
              (0, _config.getPrefixCls)(
                prefixCls,
                ''.concat(_config.imageGallery, '-rc-notification-message')
              ),
              ' '
            )
            .concat(icon ? (0, _config.getPrefixCls)(prefixCls, 'p-l') : ''),
        },
        content
      )
    ),
    onClose: function onClose() {
      _onClose(key);
    },
  };
};
/**
 * @name: Message
 * @msg: 全局message提示
 * @param {NotificationProps} props
 * @return {*}
 */

var Message = function Message(props) {
  getRCNotificationInstance(props, function (instance, ops, onClose) {
    instance.notice(getRCNoticeProps(ops, onClose));
  });
};

var _default = Message;
exports.default = _default;
