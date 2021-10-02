/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-28 10:33:51
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-02 21:48:06
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

  // 是否拖动态
  const isDown = useRef(false);

  // 拖动距离
  const [dragPos, setDragPos] = useState({
    left: 0,
    top: 0,
  });

  // 记录拖动值
  const oriPos = useRef<OriPos>({
    top: 0,
    left: 0,
    cX: 0,
    cY: 0,
  });

  const [imageClientRect, setImageClientRect] = useState<any>({});
  const [contentClientRect, setContentClientRect] = useState<any>({});

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
      setDragPos({
        left: 0,
        top: 0,
      });
    }
    return () => {};
  }, [controller.scale, dragPos]);

  /**
   * @name: onEvents
   * @msg:判断是否可以拖动，条件：图片大于父容器宽或者高，
   * @param {*} useMemo
   * @return {拖拽绑定函数}
   */
  const isDrag = useMemo(() => {
    const contentWidth = contentClientRect.width;
    const contentHeight = contentClientRect.height;
    if (
      imageClientRect.width &&
      imageClientRect.height &&
      contentWidth &&
      contentHeight
    ) {
      const scaleWidth = (imageClientRect.width * controller.scale).toFixed(2);
      const scaleHeight = (imageClientRect.height * controller.scale).toFixed(
        2,
      );
      if (scaleWidth > contentWidth || scaleHeight > contentHeight) {
        return true;
      }
    }
    return false;
  }, [controller.scale]);

  // mousedown
  const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
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

  // 获取图片样式
  const getImageStyle = useMemo(
    () => ({
      transition: `all ${isDown.current ? 20 : 300}ms ease-in-out 0s`,
      transform: `scale3d(${controller.scale}, ${controller.scale}, 1) rotate3d(0, 0, 1, ${controller.rotate}deg) translate3d(${dragPos.left}px, ${dragPos.top}px, 0)`,
    }),
    [isDown, controller, dragPos],
  );

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
        {...propsOps}
      />
    </div>
  );
};

export default ImageSlide;
