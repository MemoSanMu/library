import React, { FC, useRef, useState } from 'react';

import classNames from 'classnames';
import SliderWrapper from './components/Slider';
import {
  RightOutlined,
  LeftOutlined,
  CareLeftFilled,
  CareRightFilled,
} from './components/Svg';
import { thumbnailsMaxLength } from './config/index';
import { getPrefixCls } from './config/index';
import './styles/index.less';
const PREFIX_URL =
  'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/';

type Items = {
  src: string;
};

interface Props {
  prefixCls?: string;
  thumbnailsSlideToCount?: number;
  items: Items[];
}

const ImageGallery: FC<Props> = ({
  thumbnailsSlideToCount = 1,
  prefixCls,
  items,
}) => {
  // const prefixCls = props.prefixCls;
  const Slider = useRef<any>(); // Slider.current.slickPrev()
  const thumbnailsSlideWidth = 108;
  const maxL = (items.length - thumbnailsMaxLength) * thumbnailsSlideWidth;
  const [thumbnailsMobileW, setThumbnailsMobileW] = useState(0);
  const [thumbnailsStyle, setThumbnailsStyle] = useState({});
  const [flag, setFlag] = useState<boolean>(false);

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
            style={{ width: '100%', height: '100%' }}
            src={`${PREFIX_URL}/${1 + i}.jpg`}
          />
        </a>
      );
    },
    appendDots: (dots: React.ReactDOM[]) => {
      const maxMore = dots.length >= thumbnailsMaxLength;
      return (
        <div>
          {maxMore && (
            <CareLeftFilled
              onClick={() => {
                let trans =
                  -thumbnailsSlideWidth * thumbnailsSlideToCount +
                  thumbnailsMobileW;
                console.log(trans, Math.abs(trans), maxL);

                if (Math.abs(trans) > maxL) {
                  console.log(flag, 'flag');

                  if (flag) {
                    return;
                  }
                  if (thumbnailsSlideToCount > 1) {
                    trans = trans + thumbnailsSlideWidth;
                    setFlag(true);
                  } else {
                    return;
                  }
                }
                setThumbnailsMobileW(trans);
                setThumbnailsStyle({
                  transform: `translate3d(${trans}px, 0px, 0px)`,
                });
              }}
            />
          )}
          <div
            className={`${getPrefixCls(prefixCls, 'i-g-thumbnails-container')}`}
          >
            <ul style={thumbnailsStyle}>{dots}</ul>
          </div>
          {maxMore && (
            <CareRightFilled
              onClick={() => {
                let trans =
                  thumbnailsSlideWidth * thumbnailsSlideToCount +
                  thumbnailsMobileW;

                console.log(trans, 'trans');

                if (trans > 0) {
                  if (!flag) {
                    return;
                  }
                  if (thumbnailsSlideToCount > 1) {
                    trans = trans - thumbnailsSlideWidth;
                    setFlag(false);
                  } else {
                    return;
                  }
                }
                setThumbnailsMobileW(trans);
                setThumbnailsStyle({
                  transform: `translate3d(${trans}px, 0px, 0px)`,
                });
              }}
            />
          )}
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
                <div key={i.src}>
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
