/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-28 10:33:51
 * @LastEditors: wangsen
 * @LastEditTime: 2021-09-28 19:38:02
 */
import React, { FC, useCallback, useRef, useState } from 'react';
import { Items, Controller } from '../../interfaces';
import { getPrefixCls } from '../../config/index';

interface ImageSlideProps {
  item: Items;
  prefixCls?: string;
  controller: Controller;
}

interface OriPos {
  left: number;
  top: number;
  cX: number;
  cY: number;
}

const ImageSlide: FC<ImageSlideProps> = (props) => {
  const { item, prefixCls, controller } = props;

  const isDown = useRef(false);

  const [GalleryImageStyle, setGalleryImageStyle] = useState({
    left: 0,
    top: 0,
  });

  // const currentImage = useRef<HTMLImageElement | any>(null);  // init origin positon

  const oriPos = useRef<OriPos>({
    top: 0,
    left: 0,
    cX: 0,
    cY: 0,
  });

  // mousedown
  const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    // stop the event bubbles
    e.persist();
    isDown.current = true;

    const cY = e.clientY;
    const cX = e.clientX;
    oriPos.current = {
      ...GalleryImageStyle,
      cX,
      cY,
    };
  };

  // move mouse
  const onMouseMove = useCallback((e) => {
    if (!isDown.current) {
      return;
    }

    // element position and offset
    const style = { ...oriPos.current };
    // 鼠标偏移量
    const offsetX = e.clientX - style.cX;
    const offsetY = e.clientY - style.cY;

    const top = offsetY + style.top;
    const left = offsetX + style.left;

    // const width = 1684;
    // const height = 753;
    // const rect = currentImage.current.getBoundingClientRect();

    setGalleryImageStyle({
      left,
      top,
    });
  }, []);

  // The mouse is lifted
  const onMouseUp = useCallback(() => {
    isDown.current = false;
  }, [GalleryImageStyle]);

  return (
    <div className={getPrefixCls(prefixCls, 'i-g-image-content')}>
      <img
        // ref={currentImage}
        style={{
          transform: `scale3d(${controller.scale}, ${controller.scale}, 1) rotate3d(0, 0, 1, ${controller.rotate}deg) translate3d(${GalleryImageStyle.left}px, ${GalleryImageStyle.top}px, 0)`,
        }}
        className={getPrefixCls(prefixCls, 'i-g-image')}
        src={item.src}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      />
    </div>
  );
};

export default ImageSlide;
