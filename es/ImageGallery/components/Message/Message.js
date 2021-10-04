import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';

/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-26 16:21:32
 * @LastEditors: wangsen
 * @LastEditTime: 2021-09-28 19:50:35
 */
import React from 'react';
import RcNotification from 'rc-notification';
import { getPrefixCls, imageGallery } from '../../config/index';
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
      _objectSpread(
        _objectSpread({}, props),
        {},
        {
          key: target,
        }
      ),
      destroy
    );
  } // 创建message

  return RcNotification.newInstance(
    {
      className: className,
      maxCount: maxCount,
    },
    function (notification) {
      messageInstance = notification; // 保存notification

      callback(
        messageInstance,
        _objectSpread(
          _objectSpread({}, props),
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
    content: /*#__PURE__*/ React.createElement(
      'span',
      {
        className: ''.concat(
          getPrefixCls(
            prefixCls,
            ''.concat(imageGallery, '-rc-notification-notice-content')
          )
        ),
      },
      icon,
      /*#__PURE__*/ React.createElement(
        'span',
        {
          className: ''
            .concat(
              getPrefixCls(
                prefixCls,
                ''.concat(imageGallery, '-rc-notification-message')
              ),
              ' '
            )
            .concat(icon ? getPrefixCls(prefixCls, 'p-l') : ''),
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

export default Message;
