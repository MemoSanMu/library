import { FC } from 'react';
import { Items, Controller } from '../../interfaces';
interface ImageSlideProps {
  item: Items;
  prefixCls?: string;
  controller: Controller;
  itemsLength: number;
}
declare const ImageSlide: FC<ImageSlideProps>;
export default ImageSlide;
