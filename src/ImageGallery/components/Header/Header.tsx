/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-30 11:53:54
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-21 15:13:53
 */
import React, { FC } from 'react';
import Tooltip from '../Tooltip';
import { getPrefixCls, imageGallery } from '../../config/index';
import { Items } from '../../interfaces';

interface HeaderProps {
  prefixCls?: string;
  showTitle?: boolean;
  currentSlider: Items;
  style?: React.CSSProperties;
}

const Header: FC<HeaderProps> = ({ ...props }) => {
  const { currentSlider, showTitle, prefixCls, children, style = {} } = props;
  return (
    <header
      className={getPrefixCls(prefixCls, `${imageGallery}-header`)}
      style={style}
    >
      <div className={getPrefixCls(prefixCls, `${imageGallery}-header-alt`)}>
        {showTitle && currentSlider ? (
          <Tooltip
            text={currentSlider.title || currentSlider.src}
            placement="bottom"
            style={style}
          >
            <p
              className={getPrefixCls(
                prefixCls,
                `${imageGallery}-header-title`,
              )}
            >
              {currentSlider.title || currentSlider.src}
            </p>
          </Tooltip>
        ) : null}
      </div>
      {children}
    </header>
  );
};

export default Header;
