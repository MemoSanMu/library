/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-27 16:13:57
 * @LastEditors: wangsen
 * @LastEditTime: 2021-09-27 17:58:47
 */
import React, { FC, useCallback } from 'react';
import classNames from 'classnames';
import { getPrefixCls } from '../../config/index';

interface ToastProps {
  prefixCls?: string;
  show: boolean;
  sacleProgress: number;
}

const Toast: FC<ToastProps> = (props) => {
  const { prefixCls, show, sacleProgress } = props;

  const toastContent = useCallback(() => {
    return (
      <div className={getPrefixCls(prefixCls, 'toast-content')}>
        <span>{`${sacleProgress * 100}%`}</span>
      </div>
    );
  }, [sacleProgress]);

  const messageCls = classNames(getPrefixCls(prefixCls, 'i-g-toast'), {
    show: show,
  });

  return <div className={messageCls}>{toastContent()}</div>;
};

export default Toast;
