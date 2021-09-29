/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-29 16:06:40
 * @LastEditors: wangsen
 * @LastEditTime: 2021-09-29 20:14:06
 */
import React, { FC, useState, useRef } from 'react';
import classNames from 'classnames';

import SliderWrapper from '../Slider';
import { ImageGalleryProps, Items } from '../../interfaces';
import { getPrefixCls, imageGalleryCard, wrapperCls } from '../../config';

interface CardProps extends ImageGalleryProps {}

const Card: FC<CardProps> = ({ ...props }) => {
  const { prefixCls, items, initialSlide = 0 } = props;

  // 当前画廊数据
  const [imageGalleryItems] = useState<Items[]>(items);
  const [currentIndex, setCurrentIndex] = useState<number>(initialSlide); // 当前展示幻灯片索引

  // 当图片切换前触发钩子
  const beforeChange = (_: number, newIndex: number) => {
    setCurrentIndex(newIndex); // 保存当前newIndex
  };

  // 初始化
  const onInit = () => {};

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

  const Slider = useRef<any>(); // Slider.current.slickPrev()
  const settings = {
    arrows: false,
    beforeChange: beforeChange,
    onInit: onInit,
  };

  const wrapCls = classNames(getPrefixCls(prefixCls, imageGalleryCard), {});

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
        <ul
          className={`${getPrefixCls(prefixCls, `${imageGalleryCard}-t-c-ul`)}`}
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
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;
