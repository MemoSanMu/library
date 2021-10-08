/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-29 16:06:40
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-08 15:20:58
 */
import React, { FC, useState, useRef, useCallback, useMemo } from 'react';
import classNames from 'classnames';

import SliderWrapper from '../Slider';
import { CareLeftFilled, CareRightFilled } from '../Svg';
import { ImageGalleryProps, Items, ThumbnailsControl } from '../../interfaces';
import {
  getPrefixCls,
  imageGalleryCard,
  cardThumbnailsMaxLength,
  cardThumbnailsSlideWidth,
} from '../../config';
// import { browserIeOrSafari } from '../../utils';

interface CardProps extends ImageGalleryProps {
  isShowCardSwitchBtn?: boolean; // default true 是否显示卡片预览, 缩略图左右切换按钮，注：且同时需要items长度大于4 才生效
}

const Card: FC<CardProps> = ({ ...props }) => {
  const {
    prefixCls,
    items,
    thumbnailsSlideMobileCount = 1,
    isShowCardSwitchBtn = true,
    className,
    configurations,
  } = props;

  // 当前画廊数据
  const [imageGalleryItems] = useState<Items[]>(items);
  const [currentIndex, setCurrentIndex] = useState<number>(
    configurations?.initialSlide || 0,
  ); // 当前展示幻灯片索引

  const Slider = useRef<any>(null); // Slider.current.slickPrev()
  const SliderThumbnails = useRef<any>(null); // Slider.current.slickPrev()

  const [thumbnailsControl, setThumbnailsControl] = useState<ThumbnailsControl>(
    {
      leftDisable: true,
      rightDisable: false,
    },
  ); // 控制缩略图左右按钮禁用

  const itemsLength = imageGalleryItems.length;

  // 当图片切换前触发钩子
  const beforeChange = (newIndex: number) => {
    setCurrentIndex(newIndex); // 保存当前newIndex
  };

  /**
   * @name: slickGoTo
   * @msg: Description: Go to slide index, if dontAnimate=true, it happens without animation
   * @param Args: index, dontAnimate  Default: null, false
   * @return void
   */
  const handleSlickGoTo = (i: number) => {
    Slider.current.slickGoTo(i);
    setCurrentIndex(i);
  };

  const settings = {
    arrows: false,
    ...configurations,
    beforeChange: (oldIndex: number, newIndex: number) => {
      beforeChange(newIndex);
      typeof configurations?.beforeChange === 'function' &&
        configurations.beforeChange(oldIndex, newIndex);
    },
    onInit: () => {
      typeof configurations?.onInit === 'function' && configurations.onInit();
    },
  };

  const getIconCls = (cls?: string) => {
    return classNames(
      [getPrefixCls(prefixCls, `${imageGalleryCard}-icon`)],
      cls,
    );
  };

  // 缩略图左右切换
  const handleThumbnailsMove = (direction: string) => {
    const isLeft = direction === 'left',
      scrollLeft = SliderThumbnails.current.scrollLeft;
    let add = 0;
    const setThumbnails = isLeft
      ? {
          ...thumbnailsControl,
          rightDisable: false,
        }
      : {
          ...thumbnailsControl,
          leftDisable: false,
        };
    setThumbnailsControl(setThumbnails);
    if (scrollLeft % cardThumbnailsSlideWidth >= cardThumbnailsSlideWidth / 2) {
      add += cardThumbnailsSlideWidth - (scrollLeft % cardThumbnailsSlideWidth);
    } else {
      add -= scrollLeft % cardThumbnailsSlideWidth;
    }
    isLeft
      ? (SliderThumbnails.current.scrollLeft -=
          cardThumbnailsSlideWidth * thumbnailsSlideMobileCount - add)
      : (SliderThumbnails.current.scrollLeft +=
          cardThumbnailsSlideWidth * thumbnailsSlideMobileCount + add);
  };

  // 缩略图滚监听
  const handleScroll = useCallback((e: any) => {
    e.persist();
    const { leftDisable, rightDisable } = thumbnailsControl;
    if (leftDisable || rightDisable) {
      setThumbnailsControl({
        leftDisable: false,
        rightDisable: false,
      });
    }

    if (
      e.target.scrollLeft >=
      (itemsLength - cardThumbnailsMaxLength) * cardThumbnailsSlideWidth
    ) {
      setThumbnailsControl({
        leftDisable: false,
        rightDisable: true,
      });
    }
    if (e.target.scrollLeft === 0) {
      setThumbnailsControl({
        leftDisable: true,
        rightDisable: false,
      });
    }
  }, []);

  // 是否显示卡片预览 缩略图左右切换按钮
  const getIsShowCardSwitchBtn = useMemo(
    () => isShowCardSwitchBtn && itemsLength > 4,
    [isShowCardSwitchBtn],
  );

  const wrapCls = classNames(getPrefixCls(prefixCls, imageGalleryCard), {
    control: getIsShowCardSwitchBtn,
    [`${className}`]: className,
  });

  return (
    <div className={wrapCls}>
      {/* slider */}
      <SliderWrapper sliderWrapper={Slider} settings={settings}>
        {imageGalleryItems &&
          imageGalleryItems.map((i: Items) => (
            <div
              key={i.src}
              className={getPrefixCls(
                prefixCls,
                `${imageGalleryCard}-image-content`,
              )}
            >
              <img
                src={i.src}
                alt={i.alt}
                className={getPrefixCls(prefixCls, `${imageGalleryCard}-image`)}
              />
            </div>
          ))}
      </SliderWrapper>

      {/* 底部缩略图 */}
      <div
        className={`${getPrefixCls(
          prefixCls,
          `${imageGalleryCard}-thumbnails-content`,
        )}`}
      >
        {getIsShowCardSwitchBtn ? (
          <div
            className={`${getPrefixCls(
              prefixCls,
              `${imageGalleryCard}-thumbnails-control`,
            )}`}
            onClick={() => handleThumbnailsMove('left')}
          >
            <CareLeftFilled
              className={getIconCls()}
              thumbnailsControl={thumbnailsControl}
            />
          </div>
        ) : null}
        <ul
          className={classNames(
            `${getPrefixCls(prefixCls, `${imageGalleryCard}-t-c-ul`)}`,
            {
              center: itemsLength < 4,
            },
          )}
          ref={SliderThumbnails}
          onScroll={handleScroll}
        >
          {imageGalleryItems &&
            imageGalleryItems.map((i: Items, ind: number) => (
              <li
                key={i.src}
                className={classNames(
                  getPrefixCls(prefixCls, `${imageGalleryCard}-image`),
                  { [`${imageGalleryCard}-active`]: currentIndex === ind },
                )}
                onClick={() => handleSlickGoTo(ind)}
              >
                <img
                  className={`${getPrefixCls(
                    prefixCls,
                    `${imageGalleryCard}-t-c-img`,
                  )}`}
                  src={i.src}
                  alt={i.alt}
                />
              </li>
            ))}
        </ul>
        {getIsShowCardSwitchBtn ? (
          <div
            className={`${getPrefixCls(
              prefixCls,
              `${imageGalleryCard}-thumbnails-control`,
            )}`}
            onClick={() => handleThumbnailsMove('right')}
          >
            <CareRightFilled
              className={getIconCls()}
              thumbnailsControl={thumbnailsControl}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Card;

// 解决safari 和ie浏览器不支持  scroll-behavior: smooth;
// if (browserIeOrSafari()) {
//   const setpTo = (cardThumbnailsSlideWidth * thumbnailsSlideMobileCount + add) / 10;
//   let count = 0;
//   let timer: any = null;
//   function setp() {
//     count++;
//     if (count <= 10) {
//       SliderThumbnails.current.scrollLeft += setpTo;
//     } else {
//       clearTimeout(timer);
//       timer = null;
//       return;
//     }
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       setp();
//     }, 20);
//   }
//   setp();
// }
