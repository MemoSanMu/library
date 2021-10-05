import { FC } from 'react';
import { TooltipPlacement } from '@/ImageGallery/interfaces';
interface TooltipProps {
  prefixCls?: string;
  text: string;
  placement?: TooltipPlacement;
}
declare const Tooltip: FC<TooltipProps>;
export default Tooltip;
