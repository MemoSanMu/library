import { FC } from 'react';
import { ImageGalleryProps } from '../../interfaces';
interface BrowserProp extends ImageGalleryProps {
  destroyer?: () => void;
  isPortal?: boolean;
  browsing: boolean;
}
declare const Browser: FC<BrowserProp>;
export default Browser;
