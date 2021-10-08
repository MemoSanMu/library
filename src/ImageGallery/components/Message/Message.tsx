/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-26 16:21:32
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-08 14:15:05
 */
import React from 'react';
import RcNotification from 'rc-notification';
import {
  NotificationInstance as RCNotificationInstance,
  NoticeContent,
} from 'rc-notification/lib/Notification';
import { Warning } from '../Svg';
import { getPrefixCls, imageGallery } from '../../config/index';

let messageInstance: RCNotificationInstance | null;
let key = 1;

type CallBack = (
  instance: RCNotificationInstance,
  info: NotificationProps,
  onClose: (messageKey?: React.Key) => void,
) => void;

interface NotificationProps {
  className?: string;
  icon?: React.ReactNode;
  duration?: number;
  maxCount?: number;
  prefixCls?: string;
  content: string | React.ReactNode;
  key?: number | string;
  style?: React.CSSProperties;
}

const getRCNotificationInstance = (
  props: NotificationProps,
  callback: CallBack,
) => {
  const { className, maxCount, style } = props;
  const target = props.key || key++;

  // called when notice close
  const destroy = (messageKey?: React.Key) => {
    if (messageInstance) {
      if (messageKey) {
        const { removeNotice } = messageInstance;
        removeNotice(messageKey);
      } else {
        const { destroy } = messageInstance;
        destroy();
        messageInstance = null;
      }
    }
  };

  // 已经创建，直接追加message
  if (messageInstance) {
    return callback(
      messageInstance,
      {
        ...props,
        key: target,
      },
      destroy,
    );
  }

  // 创建message
  return RcNotification.newInstance(
    {
      className,
      maxCount,
      style: {
        ...{ top: 65, left: '50%' }, // default
        ...style,
      },
    },
    (notification) => {
      messageInstance = notification; // 保存notification
      callback(messageInstance, { ...props, key: target }, destroy);
    },
  );
};

const getRCNoticeProps = (
  { duration, icon, prefixCls, content, key }: NotificationProps,
  onClose: (messageKey?: React.Key) => void,
): NoticeContent => {
  return {
    duration,
    key,
    content: (
      <span
        className={`${getPrefixCls(
          prefixCls,
          `${imageGallery}-rc-notification-notice-content`,
        )}`}
      >
        {icon}
        <span
          className={`${getPrefixCls(
            prefixCls,
            `${imageGallery}-rc-notification-message`,
          )} ${icon ? getPrefixCls(prefixCls, 'p-l') : ''}`}
        >
          {content}
        </span>
      </span>
    ),
    onClose: () => {
      onClose(key);
    },
  };
};

/**
 * @name: Message
 * @msg: 全局message提示
 * @param {NotificationProps} props
 * @return {*}
 */
const Message = (props: NotificationProps) => {
  getRCNotificationInstance(
    props,
    (instance: RCNotificationInstance, ops, onClose) => {
      instance.notice(getRCNoticeProps(ops, onClose));
    },
  );
};

/**
 * @name: message
 * @msg: message 调用对象，目前只用到warning；
 * @param {*}
 * @return {*}
 */
export const message = {
  warning: ({
    content,
    prefixCls,
    style,
  }: {
    content: string;
    prefixCls?: string;
    style?: React.CSSProperties;
  }) =>
    Message({
      content,
      icon: (
        <span>
          <Warning />
        </span>
      ),
      duration: 3,
      style,
      className: `${getPrefixCls(
        prefixCls,
        `${imageGallery}-rc-notification`,
      )}`,
    }),
};

export default Message;
