import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';
import _extends from '@babel/runtime/helpers/esm/extends';

/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-29 16:06:40
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-08 15:20:58
 */
import React, { useState, useRef, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import SliderWrapper from '../Slider';
import { CareLeftFilled, CareRightFilled } from '../Svg';
import {
  getPrefixCls,
  imageGalleryCard,
  cardThumbnailsMaxLength,
  cardThumbnailsSlideWidth,
} from '../../config';

var Card = function Card(_ref) {
  var props = _extends({}, _ref);

  var prefixCls = props.prefixCls,
    items = props.items,
    _props$thumbnailsSlid = props.thumbnailsSlideMobileCount,
    thumbnailsSlideMobileCount =
      _props$thumbnailsSlid === void 0 ? 1 : _props$thumbnailsSlid,
    _props$isShowCardSwit = props.isShowCardSwitchBtn,
    isShowCardSwitchBtn =
      _props$isShowCardSwit === void 0 ? true : _props$isShowCardSwit,
    className = props.className,
    configurations = props.configurations; // 当前画廊数据

  var _useState = useState(items),
    _useState2 = _slicedToArray(_useState, 1),
    imageGalleryItems = _useState2[0];

  var _useState3 = useState(
      (configurations === null || configurations === void 0
        ? void 0
        : configurations.initialSlide) || 0
    ),
    _useState4 = _slicedToArray(_useState3, 2),
    currentIndex = _useState4[0],
    setCurrentIndex = _useState4[1]; // 当前展示幻灯片索引

  var Slider = useRef(null); // Slider.current.slickPrev()

  var SliderThumbnails = useRef(null); // Slider.current.slickPrev()

  var _useState5 = useState({
      leftDisable: true,
      rightDisable: false,
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    thumbnailsControl = _useState6[0],
    setThumbnailsControl = _useState6[1]; // 控制缩略图左右按钮禁用

  var itemsLength = imageGalleryItems.length; // 当图片切换前触发钩子

  var _beforeChange = function beforeChange(newIndex) {
    setCurrentIndex(newIndex); // 保存当前newIndex
  };
  /**
   * @name: slickGoTo
   * @msg: Description: Go to slide index, if dontAnimate=true, it happens without animation
   * @param Args: index, dontAnimate  Default: null, false
   * @return void
   */

  var handleSlickGoTo = function handleSlickGoTo(i) {
    Slider.current.slickGoTo(i);
    setCurrentIndex(i);
  };

  var settings = _objectSpread(
    _objectSpread(
      {
        arrows: false,
      },
      configurations
    ),
    {},
    {
      beforeChange: function beforeChange(oldIndex, newIndex) {
        _beforeChange(newIndex);

        typeof (configurations === null || configurations === void 0
          ? void 0
          : configurations.beforeChange) === 'function' &&
          configurations.beforeChange(oldIndex, newIndex);
      },
      onInit: function onInit() {
        typeof (configurations === null || configurations === void 0
          ? void 0
          : configurations.onInit) === 'function' && configurations.onInit();
      },
    }
  );

  var getIconCls = function getIconCls(cls) {
    return classNames(
      [getPrefixCls(prefixCls, ''.concat(imageGalleryCard, '-icon'))],
      cls
    );
  }; // 缩略图左右切换

  var handleThumbnailsMove = function handleThumbnailsMove(direction) {
    var isLeft = direction === 'left',
      scrollLeft = SliderThumbnails.current.scrollLeft;
    var add = 0;
    var setThumbnails = isLeft
      ? _objectSpread(
          _objectSpread({}, thumbnailsControl),
          {},
          {
            rightDisable: false,
          }
        )
      : _objectSpread(
          _objectSpread({}, thumbnailsControl),
          {},
          {
            leftDisable: false,
          }
        );
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
  }; // 缩略图滚监听

  var handleScroll = useCallback(function (e) {
    e.persist();
    var leftDisable = thumbnailsControl.leftDisable,
      rightDisable = thumbnailsControl.rightDisable;

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
  }, []); // 是否显示卡片预览 缩略图左右切换按钮

  var getIsShowCardSwitchBtn = useMemo(
    function () {
      return isShowCardSwitchBtn && itemsLength > 4;
    },
    [isShowCardSwitchBtn]
  );
  var wrapCls = classNames(
    getPrefixCls(prefixCls, imageGalleryCard),
    _defineProperty(
      {
        control: getIsShowCardSwitchBtn,
      },
      ''.concat(className),
      className
    )
  );
  return /*#__PURE__*/ React.createElement(
    'div',
    {
      className: wrapCls,
    },
    /*#__PURE__*/ React.createElement(
      SliderWrapper,
      {
        sliderWrapper: Slider,
        settings: settings,
      },
      imageGalleryItems &&
        imageGalleryItems.map(function (i) {
          return /*#__PURE__*/ React.createElement(
            'div',
            {
              key: i.src,
              className: getPrefixCls(
                prefixCls,
                ''.concat(imageGalleryCard, '-image-content')
              ),
            },
            /*#__PURE__*/ React.createElement('img', {
              src: i.src,
              alt: i.alt,
              className: getPrefixCls(
                prefixCls,
                ''.concat(imageGalleryCard, '-image')
              ),
            })
          );
        })
    ),
    /*#__PURE__*/ React.createElement(
      'div',
      {
        className: ''.concat(
          getPrefixCls(
            prefixCls,
            ''.concat(imageGalleryCard, '-thumbnails-content')
          )
        ),
      },
      getIsShowCardSwitchBtn
        ? /*#__PURE__*/ React.createElement(
            'div',
            {
              className: ''.concat(
                getPrefixCls(
                  prefixCls,
                  ''.concat(imageGalleryCard, '-thumbnails-control')
                )
              ),
              onClick: function onClick() {
                return handleThumbnailsMove('left');
              },
            },
            /*#__PURE__*/ React.createElement(CareLeftFilled, {
              className: getIconCls(),
              thumbnailsControl: thumbnailsControl,
            })
          )
        : null,
      /*#__PURE__*/ React.createElement(
        'ul',
        {
          className: classNames(
            ''.concat(
              getPrefixCls(prefixCls, ''.concat(imageGalleryCard, '-t-c-ul'))
            ),
            {
              center: itemsLength < 4,
            }
          ),
          ref: SliderThumbnails,
          onScroll: handleScroll,
        },
        imageGalleryItems &&
          imageGalleryItems.map(function (i, ind) {
            return /*#__PURE__*/ React.createElement(
              'li',
              {
                key: i.src,
                className: classNames(
                  getPrefixCls(
                    prefixCls,
                    ''.concat(imageGalleryCard, '-image')
                  ),
                  _defineProperty(
                    {},
                    ''.concat(imageGalleryCard, '-active'),
                    currentIndex === ind
                  )
                ),
                onClick: function onClick() {
                  return handleSlickGoTo(ind);
                },
              },
              /*#__PURE__*/ React.createElement('img', {
                className: ''.concat(
                  getPrefixCls(
                    prefixCls,
                    ''.concat(imageGalleryCard, '-t-c-img')
                  )
                ),
                src: i.src,
                alt: i.alt,
              })
            );
          })
      ),
      getIsShowCardSwitchBtn
        ? /*#__PURE__*/ React.createElement(
            'div',
            {
              className: ''.concat(
                getPrefixCls(
                  prefixCls,
                  ''.concat(imageGalleryCard, '-thumbnails-control')
                )
              ),
              onClick: function onClick() {
                return handleThumbnailsMove('right');
              },
            },
            /*#__PURE__*/ React.createElement(CareRightFilled, {
              className: getIconCls(),
              thumbnailsControl: thumbnailsControl,
            })
          )
        : null
    )
  );
};

export default Card; // 解决safari 和ie浏览器不支持  scroll-behavior: smooth;
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
