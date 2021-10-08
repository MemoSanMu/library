import React from 'react';
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
/**
 * @name: Message
 * @msg: 全局message提示
 * @param {NotificationProps} props
 * @return {*}
 */
declare const Message: (props: NotificationProps) => void;
/**
 * @name: message
 * @msg: message 调用对象，目前只用到warning；
 * @param {*}
 * @return {*}
 */
export declare const message: {
  warning: ({
    content,
    prefixCls,
    style,
  }: {
    content: string;
    prefixCls?: string | undefined;
    style?: React.CSSProperties | undefined;
  }) => void;
};
export default Message;
