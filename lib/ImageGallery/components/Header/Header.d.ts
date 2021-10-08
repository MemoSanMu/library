import React, { FC } from 'react';
import { Items } from '../../interfaces';
interface HeaderProps {
  prefixCls?: string;
  showTitle?: boolean;
  currentSlider: Items;
  style?: React.CSSProperties;
}
declare const Header: FC<HeaderProps>;
export default Header;
