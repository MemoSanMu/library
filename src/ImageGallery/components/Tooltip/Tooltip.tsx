/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-26 16:21:32
 * @LastEditors: wangsen
 * @LastEditTime: 2021-09-28 19:56:01
 */
import React, { FC } from 'react';
import RcTooltip from 'rc-tooltip';
import { getPrefixCls, imageGallery } from '../../config/index';
import { TooltipPlacement } from '../../interfaces';

interface TooltipProps {
  prefixCls?: string;
  text: string;
  placement?: TooltipPlacement;
}

const Tooltip: FC<TooltipProps> = (props) => {
  const {
    children,
    prefixCls,
    text,
    placement = 'top' as TooltipPlacement,
  } = props;
  return (
    <RcTooltip
      placement={placement}
      overlayClassName={`${getPrefixCls(
        prefixCls,
        `${imageGallery}-rc-tooltip`,
      )}`}
      overlay={<span>{text}</span>}
    >
      <div>{children}</div>
    </RcTooltip>
  );
};

export default Tooltip;