import { FC } from 'react';
import { ImageGalleryProps } from '../../interfaces';
interface GalleryProps extends ImageGalleryProps {
  outBrowsing: () => void;
}
declare const ImageGallery: FC<GalleryProps>;
export default ImageGallery;
