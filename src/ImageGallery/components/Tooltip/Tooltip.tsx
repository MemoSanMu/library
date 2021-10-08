/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-26 16:21:32
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-08 13:55:53
 */
import React, { FC } from 'react';
import RcTooltip from 'rc-tooltip';
import { getPrefixCls, imageGallery } from '../../config/index';
import { TooltipPlacement } from '../../interfaces';

interface TooltipProps {
  prefixCls?: string;
  text: string;
  placement?: TooltipPlacement;
  style?: React.CSSProperties;
}

const Tooltip: FC<TooltipProps> = (props) => {
  const {
    children,
    prefixCls,
    text,
    placement = 'top' as TooltipPlacement,
    style = {},
  } = props;
  return (
    <RcTooltip
      placement={placement}
      overlayClassName={`${getPrefixCls(
        prefixCls,
        `${imageGallery}-rc-tooltip`,
      )}`}
      overlay={<span>{text}</span>}
      overlayStyle={style}
    >
      <div>{children}</div>
    </RcTooltip>
  );
};

export default Tooltip;
