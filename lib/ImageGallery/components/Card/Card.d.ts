import { FC } from 'react';
import { ImageGalleryProps } from '@/ImageGallery/interfaces';
interface CardProps extends ImageGalleryProps {
  isShowCardSwitchBtn?: boolean;
}
declare const Card: FC<CardProps>;
export default Card;
