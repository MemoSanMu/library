import React, { FC } from 'react';
import ReactSlick from 'react-slick';

interface Settings {
  dots?: boolean;
  dotsClass?: string;
  className?: string;
  infinite?: boolean;
  speed?: number;
  slidesToShow: number;
  lazyLoad?: boolean;
  slidesToScroll?: number;
  nextArrow?: React.ReactNode;
  prevArrow?: React.ReactNode;
  customPaging: (i: number) => React.ReactNode;
  appendDots: (dots: React.ReactDOM[]) => React.ReactNode;
  beforeChange: (oldIndex: number, newIndex: number) => void;
  onInit: () => void;
}

interface SliderProps {
  sliderWrapper?: any;
  settings: Settings;
}

const SliderWrapper: FC<SliderProps> = (props) => {
  return (
    <ReactSlick ref={props.sliderWrapper} {...props.settings}>
      {props.children}
    </ReactSlick>
  );
};

export default SliderWrapper;
