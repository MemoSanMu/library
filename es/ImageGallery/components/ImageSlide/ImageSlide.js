import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';
import _extends from '@babel/runtime/helpers/esm/extends';

/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-28 10:33:51
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-08 15:23:40
 */
import React, {
  useCallback,
  useRef,
  useState,
  useMemo,
  useEffect,
} from 'react';
import classNames from 'classnames';
import { getPrefixCls, imageGallery } from '../../config/index';
var defaultDragPos = {
  left: 0,
  top: 0,
};

var ImageSlide = function ImageSlide(_ref) {
  var props = _extends({}, _ref);

  var item = props.item,
    prefixCls = props.prefixCls,
    controller = props.controller,
    itemsLength = props.itemsLength; // 是否拖动态

  var isDown = useRef(false); // 拖动距离

  var _useState = useState(defaultDragPos),
    _useState2 = _slicedToArray(_useState, 2),
    dragPos = _useState2[0],
    setDragPos = _useState2[1]; // 记录拖动值

  var oriPos = useRef(
    _objectSpread(
      _objectSpread({}, defaultDragPos),
      {},
      {
        cX: 0,
        cY: 0,
      }
    )
  );

  var _useState3 = useState(),
    _useState4 = _slicedToArray(_useState3, 2),
    imageClientRect = _useState4[0],
    setImageClientRect = _useState4[1];

  var _useState5 = useState(),
    _useState6 = _slicedToArray(_useState5, 2),
    contentClientRect = _useState6[0],
    setContentClientRect = _useState6[1];

  var currentImage = useCallback(function (node) {
    if (node !== null) {
      setImageClientRect(node.getBoundingClientRect());
    }
  }, []);
  var currentContent = useCallback(function (node) {
    if (node !== null) {
      setContentClientRect(node.getBoundingClientRect());
    }
  }, []);
  useEffect(
    function () {
      // 当图片被拖动过，并且缩放小于等于一倍，还原拖动为初始值；
      if ((dragPos.left !== 0 || dragPos.top !== 0) && controller.scale <= 1) {
        setDragPos(defaultDragPos);
      }

      return function () {};
    },
    [controller.scale, dragPos]
  );
  /**
   * @name: onEvents
   * @msg:判断是否可以拖动，前置条件：1:scale缩放大于1倍 ；2:图片大于父容器宽或者高，
   * @param {*} useMemo
   * @return {拖拽绑定函数}
   */

  var isDrag = useMemo(
    function () {
      var _ref2 = contentClientRect || {},
        contentWidth = _ref2.width,
        contentHeight = _ref2.height,
        _ref3 = imageClientRect || {},
        imageWidth = _ref3.width,
        imageHeight = _ref3.height,
        scale = controller.scale;

      if (imageWidth && imageHeight && contentWidth && contentHeight) {
        var scaleWidth = Number((imageWidth * scale).toFixed(2)),
          scaleHeight = Number((imageHeight * scale).toFixed(2));

        if (
          controller.scale > 1 &&
          (scaleWidth > contentWidth || scaleHeight > contentHeight)
        ) {
          return true;
        }
      }

      return false;
    },
    [controller.scale, imageClientRect]
  ); // mousedown

  var onMouseDown = function onMouseDown(e) {
    // 前置判断 是否满足拖动条件，否则直接返回
    if (!isDrag) {
      return;
    } // stop the event bubbles

    e.persist();
    isDown.current = true;
    var cY = e.clientY;
    var cX = e.clientX;
    oriPos.current = _objectSpread(
      _objectSpread({}, dragPos),
      {},
      {
        cX: cX,
        cY: cY,
      }
    );
  }; // move mouse

  var onMouseMove = useCallback(function (e) {
    e.persist();

    if (!isDown.current) {
      return;
    } // element position and offset

    var style = _objectSpread({}, oriPos.current); // 鼠标偏移量

    var offsetX = e.clientX - style.cX;
    var offsetY = e.clientY - style.cY;
    var top = offsetY + style.top;
    var left = offsetX + style.left;
    setDragPos({
      left: left,
      top: top,
    });
  }, []); // The mouse is lifted

  var onMouseUp = useCallback(
    function () {
      isDown.current = false;
    },
    [dragPos]
  ); // 鼠标移出元素 若是满足拖动条件 且 isDown已按下 将其改为未按下

  var onMouseOut = useCallback(
    function () {
      if (isDrag && isDown.current) {
        isDown.current = false;
      }
    },
    [isDrag]
  ); // 获取图片样式

  var getImageStyle = useMemo(
    function () {
      var r = controller.rotate,
        scale = controller.scale,
        left = dragPos.left,
        top = dragPos.top;
      var x = left,
        y = top; //若是旋转度数大于360，即将大于数%360后便于判断调整拖动方向；

      var rotate = r > 360 || r < -360 ? r % 360 : r; // +-90度

      if ((rotate / 90) % 1 === 0) {
        if (rotate < 0) {
          x = -top;
          y = left;
        } else {
          x = top;
          y = -left;
        }
      } // +-180度

      if ((rotate / 90) % 2 === 0) {
        x = -left;
        y = -top;
      } // +-270度

      if ((rotate / 90) % 3 === 0) {
        if (rotate < 0) {
          x = top;
          y = -left;
        } else {
          x = -top;
          y = left;
        }
      } // +-360 | 0度

      if ((rotate / 90) % 4 === 0) {
        x = left;
        y = top;
      }

      return {
        transition: 'all '.concat(
          isDown.current ? 20 : 300,
          'ms ease-in-out 0s'
        ),
        transform: 'scale3d('
          .concat(scale, ', ')
          .concat(scale, ', 1) rotate3d(0, 0, 1, ')
          .concat(r, 'deg) translate3d(')
          .concat(x, 'px, ')
          .concat(y, 'px, 0)'),
      };
    },
    [isDown, controller, dragPos]
  );
  var propsOps =
    itemsLength > 1
      ? {
          style: getImageStyle,
        }
      : {};
  return /*#__PURE__*/ React.createElement(
    'div',
    {
      ref: currentContent,
      className: getPrefixCls(
        prefixCls,
        ''.concat(imageGallery, '-image-content')
      ),
    },
    /*#__PURE__*/ React.createElement(
      'img',
      _objectSpread(
        {
          ref: currentImage,
          className: classNames(
            getPrefixCls(prefixCls, ''.concat(imageGallery, '-image')),
            {
              move: itemsLength > 1 && isDrag,
            }
          ),
          src: item.src,
          alt: item.alt,
          onMouseDown: onMouseDown,
          onMouseUp: onMouseUp,
          onMouseMove: onMouseMove,
          onMouseOut: onMouseOut,
        },
        propsOps
      )
    )
  );
};

export default ImageSlide;
