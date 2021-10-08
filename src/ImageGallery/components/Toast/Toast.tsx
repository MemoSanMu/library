/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-27 16:13:57
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-08 14:32:01
 */
import React, { FC, useCallback } from 'react';
import classNames from 'classnames';
import { getPrefixCls, imageGallery } from '../../config/index';

interface ToastProps {
  prefixCls?: string;
  show: boolean;
  sacleProgress: number;
  style?: React.CSSProperties;
}

const Toast: FC<ToastProps> = (props) => {
  const { prefixCls, show, sacleProgress, style = {} } = props;

  const toastContent = useCallback(() => {
    return (
      <div className={getPrefixCls(prefixCls, 'toast-content')}>
        <span>{`${sacleProgress * 100}%`}</span>
      </div>
    );
  }, [sacleProgress]);

  const messageCls = classNames(
    getPrefixCls(prefixCls, `${imageGallery}-toast`),
    {
      show: show,
    },
  );

  return (
    <div className={messageCls} style={style}>
      {toastContent()}
    </div>
  );
};

export default Toast;
