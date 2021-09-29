/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-17 19:18:09
 * @LastEditors: wangsen
 * @LastEditTime: 2021-09-29 17:24:30
 */
import React, { FC } from 'react';
import ReactSlick from 'react-slick';

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
  arrows?: boolean; // 是否展示左右箭头
  customPaging?: (i: number) => React.ReactNode;
  appendDots?: (dots: React.ReactDOM[]) => React.ReactNode;
  beforeChange?: (oldIndex: number, newIndex: number) => void;
  onInit?: () => void;
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
