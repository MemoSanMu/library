import React, { FC } from 'react';
interface Settings {
  dots?: boolean;
  dotsClass?: string;
  className?: string;
  infinite?: boolean;
  speed?: number;
  slidesToShow?: number;
  lazyLoad?: boolean;
  slidesToScroll?: number;
  nextArrow?: React.ReactNode;
  prevArrow?: React.ReactNode;
  arrows?: boolean;
  customPaging?: (i: number) => React.ReactNode;
  appendDots?: (dots: React.ReactDOM[]) => React.ReactNode;
  beforeChange?: (oldIndex: number, newIndex: number) => void;
  onInit?: () => void;
}
interface SliderProps {
  sliderWrapper?: any;
  settings: Settings;
}
declare const SliderWrapper: FC<SliderProps>;
export default SliderWrapper;
