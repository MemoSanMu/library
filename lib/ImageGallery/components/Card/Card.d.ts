import { FC } from 'react';
import { ImageGalleryProps } from '../../interfaces';
export interface CardProps extends ImageGalleryProps {
  isShowCardSwitchBtn?: boolean;
  cardThumbnailsMaxLength?: number;
}
declare const Card: FC<CardProps>;
export default Card;
