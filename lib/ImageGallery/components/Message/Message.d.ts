import React from 'react';
interface NotificationProps {
  className?: string;
  icon?: React.ReactNode;
  duration?: number;
  maxCount?: number;
  prefixCls?: string;
  content: string | React.ReactNode;
  key?: number | string;
}
/**
 * @name: Message
 * @msg: 全局message提示
 * @param {NotificationProps} props
 * @return {*}
 */
declare const Message: (props: NotificationProps) => void;
export default Message;
