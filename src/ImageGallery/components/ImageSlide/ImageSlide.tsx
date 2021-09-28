/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-28 10:33:51
 * @LastEditors: wangsen
 * @LastEditTime: 2021-09-28 15:52:27
 */
import React, { FC, useCallback, useRef, useState } from 'react';
import Message from '../Message';
import { Items, Controller } from '../../interfaces';
import { getPrefixCls } from '../../config/index';

interface ImageSlideProps {
  item: Items;
  prefixCls?: string;
  currentGalleryImageStyle: React.CSSProperties;
  controller: Controller;
}

interface OriPos {
  left: number;
  top: number;
  cX: number;
  cY: number;
  scale: number;
  [name: string]: any;
}

const ImageSlide: FC<ImageSlideProps> = (props) => {
  const { item, prefixCls, currentGalleryImageStyle, controller } = props;

  const isDown = useRef(false);

  const [GalleryImageStyle, setGalleryImageStyle] = useState({
    left: 0,
    top: 0,
  });

  const dragBox = useRef<HTMLElement | null>(null);
  const currentImage = useRef<HTMLImageElement | any>(null);

  // init origin positon
  const oriPos = useRef<OriPos>({
    top: 0, // element position
    left: 0,
    cX: 0, // mouse position
    cY: 0,
    scale: 0,
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
      scale: controller.scale,
      cX,
      cY,
    };
  };

  // move mouse
  const onMouseMove = useCallback((e) => {
    if (!isDown.current) {
      return;
    }
    e.persist();

    // element position and offset
    const style = { ...oriPos.current };
    // 鼠标偏移量
    const offsetX = e.clientX - style.cX;
    const offsetY = e.clientY - style.cY;

    const top = offsetY + style.top;
    const left = offsetX + style.left;

    const width = 1684;
    const height = 753;
    // console.log(currentImage.current?.width * style.scale);
    // const rect = currentImage.current.getBoundingClientRect();
    // console.log(rect, 'rect');
    // console.log(Math.ceil(rect.left), 'Math.ceil(rect.left)');

    // if (offsetX >= 0 && Math.ceil(rect.left) >= 118) {
    //   Message({
    //     content: '左边',
    //     duration: 3,
    //     className: `${getPrefixCls(prefixCls, 'i-g-rc-notification')}`,
    //     maxCount: 1,
    //   });
    //   return;
    // }
    // if (rect.right >= 118) {
    //   console.log('rect.right >= 118');
    // }

    setGalleryImageStyle({
      left,
      top,
    });
  }, []);

  // The mouse is lifted
  const onMouseUp = useCallback(
    (e) => {
      isDown.current = false;
    },
    [GalleryImageStyle],
  );

  return (
    <div className={getPrefixCls(prefixCls, 'i-g-image-content')}>
      <img
        style={{
          transform: `${currentGalleryImageStyle.transform} translate3d(${GalleryImageStyle.left}px, ${GalleryImageStyle.top}px, 0)`,
        }}
        ref={currentImage}
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
