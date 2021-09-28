/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-24 16:40:06
 * @LastEditors: wangsen
 * @LastEditTime: 2021-09-28 19:50:08
 */
import React, { FC } from 'react';
import { LoaderSizeProps } from './interfaces';
import { getPrefixCls, imageGallery } from '../../config/index';
import Portals from '../Portal';

const Loader: FC<LoaderSizeProps> = ({
  loading = false,
  size = '35px',
  color = '#000000',
  prefixCls,
}) => {
  const style = () => {
    return {
      width: size,
      height: size,
      borderColor: `${color}`,
      borderBottomColor: 'transparent',
    };
  };

  return loading ? (
    <Portals
      className={getPrefixCls(prefixCls, `${imageGallery}-loading`)}
      elementType="div"
    >
      <span
        style={style()}
        className={getPrefixCls(prefixCls, 'loading-clip')}
      ></span>
    </Portals>
  ) : null;
};

export default Loader;
