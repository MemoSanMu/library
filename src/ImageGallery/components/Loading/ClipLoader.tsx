import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { LoaderSizeProps } from './interfaces';
import { getPrefixCls } from '../../config/index';
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
      className={getPrefixCls(prefixCls, 'i-g-loading')}
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
