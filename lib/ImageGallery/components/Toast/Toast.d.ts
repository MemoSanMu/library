import React, { FC } from 'react';
interface ToastProps {
  prefixCls?: string;
  show: boolean;
  sacleProgress: number;
  style?: React.CSSProperties;
}
declare const Toast: FC<ToastProps>;
export default Toast;
