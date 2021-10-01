/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-28 10:33:51
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-01 12:10:00
 */
import React, { FC, useCallback, useRef, useState, useMemo } from 'react';
import classNames from 'classnames';
import { Items, Controller } from '../../interfaces';
import { getPrefixCls, imageGallery } from '../../config/index';

interface ImageSlideProps {
  item: Items;
  prefixCls?: string;
  controller: Controller;
  itemsLength: number;
}

interface OriPos {
  left: number;
  top: number;
  cX: number;
  cY: number;
}

const ImageSlide: FC<ImageSlideProps> = ({ ...props }) => {
  const { item, prefixCls, controller, itemsLength } = props;

  const isDown = useRef(false);

  const [dragPos, setDragPos] = useState({
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
      ...dragPos,
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

    setDragPos({
      left,
      top,
    });
  }, []);

  // The mouse is lifted
  // const onMouseUp = useCallback(() => {
  //   console.log(isDown.current, 'isDown.current');

  //   isDown.current = false;
  // }, [dragPos]);

  const onMouseUp = () => {
    isDown.current = false;
  };

  // 获取图片样式
  const getImageStyle = useMemo(
    () => ({
      transition: `all ${isDown.current ? 20 : 300}ms ease-in-out 0s`,
      transform: `scale3d(${controller.scale}, ${controller.scale}, 1) rotate3d(0, 0, 1, ${controller.rotate}deg) translate3d(${dragPos.left}px, ${dragPos.top}px, 0)`,
    }),
    [isDown, controller, dragPos],
  );

  const onEvents =
    itemsLength > 1
      ? {
          onMouseDown,
          onMouseUp,
          onMouseMove,
          style: getImageStyle,
        }
      : {};

  return (
    <div className={getPrefixCls(prefixCls, `${imageGallery}-image-content`)}>
      <img
        // ref={currentImage}
        className={classNames(
          getPrefixCls(prefixCls, `${imageGallery}-image`),
          {
            move: itemsLength > 1,
          },
        )}
        src={item.src}
        {...onEvents}
      />
    </div>
  );
};

export default ImageSlide;
