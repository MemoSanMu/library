/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-28 10:33:51
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-05 10:38:20
 */
import React, {
  FC,
  useCallback,
  useRef,
  useState,
  useMemo,
  useEffect,
} from 'react';
import classNames from 'classnames';
import { Items, Controller } from '@/ImageGallery/interfaces';
import { getPrefixCls, imageGallery } from '@/ImageGallery/config';

interface ImageSlideProps {
  item: Items;
  prefixCls?: string;
  controller: Controller;
  itemsLength: number;
}

interface Direction {
  left: number;
  top: number;
}

interface OriPos extends Direction {
  cX: number;
  cY: number;
}

const defaultDragPos = {
  left: 0,
  top: 0,
};

const ImageSlide: FC<ImageSlideProps> = ({ ...props }) => {
  const { item, prefixCls, controller, itemsLength } = props;

  // 是否拖动态
  const isDown = useRef(false);

  // 拖动距离
  const [dragPos, setDragPos] = useState<Direction>(defaultDragPos);

  // 记录拖动值
  const oriPos = useRef<OriPos>({
    ...defaultDragPos,
    cX: 0,
    cY: 0,
  });

  const [imageClientRect, setImageClientRect] = useState<DOMRect>();
  const [contentClientRect, setContentClientRect] = useState<DOMRect>();

  const currentImage = useCallback((node) => {
    if (node !== null) {
      setImageClientRect(node.getBoundingClientRect());
    }
  }, []);

  const currentContent = useCallback((node) => {
    if (node !== null) {
      setContentClientRect(node.getBoundingClientRect());
    }
  }, []);

  useEffect(() => {
    // 当图片被拖动过，并且缩放小于等于一倍，还原拖动为初始值；
    if ((dragPos.left !== 0 || dragPos.top !== 0) && controller.scale <= 1) {
      setDragPos(defaultDragPos);
    }
    return () => {};
  }, [controller.scale, dragPos]);

  /**
   * @name: onEvents
   * @msg:判断是否可以拖动，前置条件：1:scale缩放大于1倍 ；2:图片大于父容器宽或者高，
   * @param {*} useMemo
   * @return {拖拽绑定函数}
   */
  const isDrag = useMemo(() => {
    const { width: contentWidth, height: contentHeight } =
        contentClientRect || {},
      { width: imageWidth, height: imageHeight } = imageClientRect || {},
      { scale } = controller;
    if (imageWidth && imageHeight && contentWidth && contentHeight) {
      const scaleWidth = Number((imageWidth * scale).toFixed(2)),
        scaleHeight = Number((imageHeight * scale).toFixed(2));
      if (
        controller.scale > 1 &&
        (scaleWidth > contentWidth || scaleHeight > contentHeight)
      ) {
        return true;
      }
    }
    return false;
  }, [controller.scale, imageClientRect]);

  // mousedown
  const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    // 前置判断 是否满足拖动条件，否则直接返回
    if (!isDrag) {
      return;
    }
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
    e.persist();
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

    setDragPos({
      left,
      top,
    });
  }, []);

  // The mouse is lifted
  const onMouseUp = useCallback(() => {
    isDown.current = false;
  }, [dragPos]);

  // 鼠标移出元素 若是满足拖动条件 且 isDown已按下 将其改为未按下
  const onMouseOut = useCallback(() => {
    if (isDrag && isDown.current) {
      isDown.current = false;
    }
  }, [isDrag]);

  // 获取图片样式
  const getImageStyle = useMemo(() => {
    const { rotate: r, scale } = controller,
      { left, top } = dragPos;
    let x = left,
      y = top;

    //若是旋转度数大于360，即将大于数%360后便于判断调整拖动方向；
    const rotate = r > 360 || r < -360 ? r % 360 : r;

    // +-90度
    if ((rotate / 90) % 1 === 0) {
      if (rotate < 0) {
        x = -top;
        y = left;
      } else {
        x = top;
        y = -left;
      }
    }
    // +-180度
    if ((rotate / 90) % 2 === 0) {
      x = -left;
      y = -top;
    }
    // +-270度
    if ((rotate / 90) % 3 === 0) {
      if (rotate < 0) {
        x = top;
        y = -left;
      } else {
        x = -top;
        y = left;
      }
    }
    // +-360 | 0度
    if ((rotate / 90) % 4 === 0) {
      x = left;
      y = top;
    }

    return {
      transition: `all ${isDown.current ? 20 : 300}ms ease-in-out 0s`,
      transform: `scale3d(${scale}, ${scale}, 1) rotate3d(0, 0, 1, ${r}deg) translate3d(${x}px, ${y}px, 0)`,
    };
  }, [isDown, controller, dragPos]);

  const propsOps =
    itemsLength > 1
      ? {
          style: getImageStyle,
        }
      : {};

  return (
    <div
      ref={currentContent}
      className={getPrefixCls(prefixCls, `${imageGallery}-image-content`)}
    >
      <img
        ref={currentImage}
        className={classNames(
          getPrefixCls(prefixCls, `${imageGallery}-image`),
          {
            move: itemsLength > 1 && isDrag,
          },
        )}
        src={item.src}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseOut}
        {...propsOps}
      />
    </div>
  );
};

export default ImageSlide;
