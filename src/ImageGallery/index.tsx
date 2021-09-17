import React, { FC, useRef } from 'react';

import classNames from 'classnames';
import SliderWrapper from './components/Slider';
import {
  RightOutlined,
  LeftOutlined,
  CareLeftFilled,
  CareRightFilled,
} from './components/Svg';

import { getPrefixCls } from './config/index';
import './styles/index.less';
const PREFIX_URL =
  'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/';

interface Props {
  prefixCls?: string;
}

const defaultProps: Props = {
  prefixCls: '',
};

const ImageGallery: FC<Props> = (props = defaultProps) => {
  const Slider = useRef<any>();

  const settings = {
    dots: true,
    dotsClass: 'slick-dots slick-thumb image-gallery-thumbnails-container',
    className: 'slick-slider-wraper',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    // lazyLoad: true,
    slidesToScroll: 1,
    nextArrow: <RightOutlined />,
    prevArrow: <LeftOutlined />,
    customPaging: function (i: number) {
      return (
        <a>
          <img
            style={{ width: '100%', height: '100%' }}
            src={`${PREFIX_URL}/${1 + i}.jpg`}
          />
        </a>
      );
    },
    appendDots: (dots: React.ReactDOM[]) => {
      const maxMore = dots.length >= 9;
      return (
        <ul>
          {maxMore && (
            <CareLeftFilled onClick={() => Slider.current.slickPrev()} />
          )}
          {dots}
          {maxMore && (
            <CareRightFilled onClick={() => Slider.current.slickNext()} />
          )}
        </ul>
      );
    },
    beforeChange: (oldIndex: number, newIndex: number) => {
      console.log(oldIndex, 'oldIndex');
      console.log(newIndex, 'newIndex');
    },
    onInit: () => {
      console.log('onInit');
    },
  };

  const prefixCls = getPrefixCls(props.prefixCls);

  const className = classNames(prefixCls, {});

  return (
    <div className={className}>
      <div className="container">
        <SliderWrapper sliderWrapper={Slider} settings={settings}>
          <div>
            <img
              className="image-gallery-image"
              src={`${PREFIX_URL}/${1}.jpg`}
            />
          </div>
          <div>
            <img
              className="image-gallery-image"
              src={`${PREFIX_URL}/${2}.jpg`}
            />
          </div>
          <div>
            <img
              className="image-gallery-image"
              src={`${PREFIX_URL}/${3}.jpg`}
            />
          </div>
          <div>
            <img
              className="image-gallery-image"
              src={`${PREFIX_URL}/${4}.jpg`}
            />
          </div>
          <div>
            <img
              className="image-gallery-image"
              src={`${PREFIX_URL}/${5}.jpg`}
            />
          </div>
          <div>
            <img
              className="image-gallery-image"
              src={`${PREFIX_URL}/${6}.jpg`}
            />
          </div>
          <div>
            <img
              className="image-gallery-image"
              src={`${PREFIX_URL}/${7}.jpg`}
            />
          </div>
          <div>
            <img
              className="image-gallery-image"
              src={`${PREFIX_URL}/${8}.jpg`}
            />
          </div>
          <div>
            <img
              className="image-gallery-image"
              src={`${PREFIX_URL}/${9}.jpg`}
            />
          </div>
        </SliderWrapper>
      </div>
    </div>
  );
};

export default ImageGallery;
