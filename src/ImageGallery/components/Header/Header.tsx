/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-30 11:53:54
 * @LastEditors: wangsen
 * @LastEditTime: 2021-09-30 15:43:43
 */
import React, { FC } from 'react';
import Tooltip from '../Tooltip';
import { getPrefixCls, imageGallery } from '../../config/index';
import { Items } from '../../interfaces';

interface HeaderProps {
  prefixCls?: string;
  showTitle?: boolean;
  currentSlider: Items;
}

const Header: FC<HeaderProps> = ({ ...props }) => {
  const { currentSlider, showTitle, prefixCls, children } = props;
  return (
    <header className={getPrefixCls(prefixCls, `${imageGallery}-header`)}>
      <div className={getPrefixCls(prefixCls, `${imageGallery}-header-alt`)}>
        {showTitle && (
          <Tooltip text={currentSlider.alt || currentSlider.src}>
            <p
              className={getPrefixCls(
                prefixCls,
                `${imageGallery}-header-title`,
              )}
            >
              {currentSlider.alt || currentSlider.src}
            </p>
          </Tooltip>
        )}
      </div>
      {children}
    </header>
  );
};

export default Header;
