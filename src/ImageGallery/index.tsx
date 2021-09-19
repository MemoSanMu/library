import React, { FC, useRef, useState } from 'react';

import classNames from 'classnames';
import SliderWrapper from './components/Slider';
import {
  RightOutlined,
  LeftOutlined,
  CareLeftFilled,
  CareRightFilled,
} from './components/Svg';
import {
  thumbnailsMaxLength,
  thumbnailsSlideWidth,
  getMaxXMobileRang,
} from './config/index';
import { getPrefixCls } from './config/index';
import './styles/index.less';
const PREFIX_URL =
  'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/';

type Items = {
  src: string;
};
type Direction = string | 'left' | 'right';

interface Props {
  prefixCls?: string;
  thumbnailsSlideMobileCount?: number; // 缩略图可滚动条数
  items: Items[];
}

const ImageGallery: FC<Props> = ({
  thumbnailsSlideMobileCount = 1,
  prefixCls,
  items,
}) => {
  const Slider = useRef<any>(); // Slider.current.slickPrev()

  const maxXMobileRange = getMaxXMobileRang(items.length);
  const [thumbnailsMobileW, setThumbnailsMobileW] = useState(0); // 缩略图 累计滚动的x轴宽度
  const [thumbnailsStyle, setThumbnailsStyle] = useState({}); // 缩略图 滚动样式

  // 处理缩略图左右切换移动按钮 滚动宽度
  const handleControlMobile = (isLeft: boolean) => {
    let transX;
    if (isLeft) {
      transX =
        -thumbnailsSlideWidth * thumbnailsSlideMobileCount + thumbnailsMobileW;
      if (Math.abs(transX) > maxXMobileRange) {
        transX = -maxXMobileRange;
      }
    } else {
      transX =
        thumbnailsSlideWidth * thumbnailsSlideMobileCount + thumbnailsMobileW;
      if (transX > 0) {
        transX = 0;
      }
    }
    setThumbnailsMobileW(transX);
    setThumbnailsStyle({
      transform: `translate3d(${transX}px, 0px, 0px)`,
    });
  };

  // 获取缩略图左右切换移动按钮
  const getControlMobileBtn = (
    dots: React.ReactDOM[],
    direction: Direction,
  ) => {
    const maxMore = dots.length >= thumbnailsMaxLength;
    const isLeft = direction === 'left';
    const Component = isLeft ? CareLeftFilled : CareRightFilled;
    return maxMore && <Component onClick={() => handleControlMobile(isLeft)} />;
  };

  const settings = {
    dots: true,
    dotsClass: `slick-dots slick-thumb ${getPrefixCls(
      prefixCls,
      'i-g-thumbnails',
    )}`,
    className: getPrefixCls(prefixCls, 'slick-slider'),
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
            className={`${getPrefixCls(prefixCls, 'i-g-t-c-img')}`}
            src={items[i].src}
          />
        </a>
      );
    },
    appendDots: (dots: React.ReactDOM[]) => {
      return (
        <div>
          {getControlMobileBtn(dots, 'left')}
          <div
            className={`${getPrefixCls(prefixCls, 'i-g-thumbnails-container')}`}
          >
            <ul
              className={`${getPrefixCls(prefixCls, 'i-g-t-c-ul')}`}
              style={thumbnailsStyle}
            >
              {dots}
            </ul>
          </div>
          {getControlMobileBtn(dots, 'right')}
        </div>
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

  const wrapCls = classNames(getPrefixCls(prefixCls), {});

  return (
    <div className={wrapCls}>
      <div className={getPrefixCls(prefixCls, 'i-g-container')}>
        <SliderWrapper sliderWrapper={Slider} settings={settings}>
          {items &&
            items.map((i: Items) => {
              return (
                <div
                  key={i.src}
                  className={getPrefixCls(prefixCls, 'i-g-image-box')}
                >
                  <img
                    className={getPrefixCls(prefixCls, 'i-g-image')}
                    src={i.src}
                  />
                </div>
              );
            })}
        </SliderWrapper>
      </div>
    </div>
  );
};

export default ImageGallery;
