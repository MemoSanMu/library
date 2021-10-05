import { FC } from 'react';
import { Items } from '@/ImageGallery/interfaces';
interface HeaderProps {
  prefixCls?: string;
  showTitle?: boolean;
  currentSlider: Items;
}
declare const Header: FC<HeaderProps>;
export default Header;
