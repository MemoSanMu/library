import { FC } from 'react';
import { TooltipPlacement } from '../../interfaces';
interface TooltipProps {
  prefixCls?: string;
  text: string;
  placement?: TooltipPlacement;
}
declare const Tooltip: FC<TooltipProps>;
export default Tooltip;
