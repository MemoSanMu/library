'use strict';

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
);

var _objectSpread2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectSpread2')
);

var _slicedToArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/slicedToArray')
);

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
);

var _react = _interopRequireWildcard(require('react'));

var _classnames = _interopRequireDefault(require('classnames'));

var _Slider = _interopRequireDefault(require('../Slider'));

var _Svg = require('../Svg');

var _config = require('../../config');

/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-29 16:06:40
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-05 10:33:29
 */
var Card = function Card(_ref) {
  var props = (0, _extends2.default)({}, _ref);
  var prefixCls = props.prefixCls,
    items = props.items,
    _props$initialSlide = props.initialSlide,
    initialSlide = _props$initialSlide === void 0 ? 0 : _props$initialSlide,
    _props$thumbnailsSlid = props.thumbnailsSlideMobileCount,
    thumbnailsSlideMobileCount =
      _props$thumbnailsSlid === void 0 ? 1 : _props$thumbnailsSlid,
    _props$isShowCardSwit = props.isShowCardSwitchBtn,
    isShowCardSwitchBtn =
      _props$isShowCardSwit === void 0 ? true : _props$isShowCardSwit; // 当前画廊数据

  var _useState = (0, _react.useState)(items),
    _useState2 = (0, _slicedToArray2.default)(_useState, 1),
    imageGalleryItems = _useState2[0];

  var _useState3 = (0, _react.useState)(initialSlide),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    currentIndex = _useState4[0],
    setCurrentIndex = _useState4[1]; // 当前展示幻灯片索引

  var Slider = (0, _react.useRef)(null); // Slider.current.slickPrev()

  var SliderThumbnails = (0, _react.useRef)(null); // Slider.current.slickPrev()

  var _useState5 = (0, _react.useState)({
      leftDisable: true,
      rightDisable: false,
    }),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    thumbnailsControl = _useState6[0],
    setThumbnailsControl = _useState6[1]; // 控制缩略图左右按钮禁用

  var itemsLength = imageGalleryItems.length; // 当图片切换前触发钩子

  var beforeChange = function beforeChange(_, newIndex) {
    setCurrentIndex(newIndex); // 保存当前newIndex
  }; // 初始化

  var onInit = function onInit() {};
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

  var settings = {
    arrows: false,
    initialSlide: initialSlide,
    beforeChange: beforeChange,
    onInit: onInit,
  };

  var getIconCls = function getIconCls(cls) {
    return (0, _classnames.default)(
      [
        (0, _config.getPrefixCls)(
          prefixCls,
          ''.concat(_config.imageGalleryCard, '-icon')
        ),
      ],
      cls
    );
  }; // 缩略图左右切换

  var handleThumbnailsMove = function handleThumbnailsMove(direction) {
    var isLeft = direction === 'left',
      scrollLeft = SliderThumbnails.current.scrollLeft;
    var add = 0;
    var setThumbnails = isLeft
      ? (0, _objectSpread2.default)(
          (0, _objectSpread2.default)({}, thumbnailsControl),
          {},
          {
            rightDisable: false,
          }
        )
      : (0, _objectSpread2.default)(
          (0, _objectSpread2.default)({}, thumbnailsControl),
          {},
          {
            leftDisable: false,
          }
        );
    setThumbnailsControl(setThumbnails);

    if (
      scrollLeft % _config.cardThumbnailsSlideWidth >=
      _config.cardThumbnailsSlideWidth / 2
    ) {
      add +=
        _config.cardThumbnailsSlideWidth -
        (scrollLeft % _config.cardThumbnailsSlideWidth);
    } else {
      add -= scrollLeft % _config.cardThumbnailsSlideWidth;
    }

    isLeft
      ? (SliderThumbnails.current.scrollLeft -=
          _config.cardThumbnailsSlideWidth * thumbnailsSlideMobileCount - add)
      : (SliderThumbnails.current.scrollLeft +=
          _config.cardThumbnailsSlideWidth * thumbnailsSlideMobileCount + add);
  }; // 缩略图滚监听

  var handleScroll = (0, _react.useCallback)(function (e) {
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
      (itemsLength - _config.cardThumbnailsMaxLength) *
        _config.cardThumbnailsSlideWidth
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

  var getIsShowCardSwitchBtn = (0, _react.useMemo)(
    function () {
      return isShowCardSwitchBtn && itemsLength > 4;
    },
    [isShowCardSwitchBtn]
  );
  var wrapCls = (0, _classnames.default)(
    (0, _config.getPrefixCls)(prefixCls, _config.imageGalleryCard),
    {
      control: getIsShowCardSwitchBtn,
    }
  );
  return /*#__PURE__*/ _react.default.createElement(
    'div',
    {
      className: wrapCls,
    },
    /*#__PURE__*/ _react.default.createElement(
      _Slider.default,
      {
        sliderWrapper: Slider,
        settings: settings,
      },
      imageGalleryItems &&
        imageGalleryItems.map(function (i) {
          return /*#__PURE__*/ _react.default.createElement(
            'div',
            {
              key: i.src,
              className: (0, _config.getPrefixCls)(
                prefixCls,
                ''.concat(_config.imageGalleryCard, '-image-content')
              ),
            },
            /*#__PURE__*/ _react.default.createElement('img', {
              src: i.src,
              className: (0, _config.getPrefixCls)(
                prefixCls,
                ''.concat(_config.imageGalleryCard, '-image')
              ),
            })
          );
        })
    ),
    /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        className: ''.concat(
          (0, _config.getPrefixCls)(
            prefixCls,
            ''.concat(_config.imageGalleryCard, '-thumbnails-content')
          )
        ),
      },
      getIsShowCardSwitchBtn
        ? /*#__PURE__*/ _react.default.createElement(
            'div',
            {
              className: ''.concat(
                (0, _config.getPrefixCls)(
                  prefixCls,
                  ''.concat(_config.imageGalleryCard, '-thumbnails-control')
                )
              ),
              onClick: function onClick() {
                return handleThumbnailsMove('left');
              },
            },
            /*#__PURE__*/ _react.default.createElement(_Svg.CareLeftFilled, {
              className: getIconCls(),
              thumbnailsControl: thumbnailsControl,
            })
          )
        : null,
      /*#__PURE__*/ _react.default.createElement(
        'ul',
        {
          className: ''.concat(
            (0, _config.getPrefixCls)(
              prefixCls,
              ''.concat(_config.imageGalleryCard, '-t-c-ul')
            )
          ),
          ref: SliderThumbnails,
          onScroll: handleScroll,
        },
        imageGalleryItems &&
          imageGalleryItems.map(function (i, ind) {
            return /*#__PURE__*/ _react.default.createElement(
              'li',
              {
                key: i.src,
                className: (0, _classnames.default)(
                  (0, _config.getPrefixCls)(
                    prefixCls,
                    ''.concat(_config.imageGalleryCard, '-image')
                  ),
                  (0, _defineProperty2.default)(
                    {},
                    ''.concat(_config.imageGalleryCard, '-active'),
                    currentIndex === ind
                  )
                ),
                onClick: function onClick() {
                  return handleSlickGoTo(ind);
                },
              },
              /*#__PURE__*/ _react.default.createElement('img', {
                className: ''.concat(
                  (0, _config.getPrefixCls)(
                    prefixCls,
                    ''.concat(_config.imageGalleryCard, '-t-c-img')
                  )
                ),
                src: i.src,
              })
            );
          })
      ),
      getIsShowCardSwitchBtn
        ? /*#__PURE__*/ _react.default.createElement(
            'div',
            {
              className: ''.concat(
                (0, _config.getPrefixCls)(
                  prefixCls,
                  ''.concat(_config.imageGalleryCard, '-thumbnails-control')
                )
              ),
              onClick: function onClick() {
                return handleThumbnailsMove('right');
              },
            },
            /*#__PURE__*/ _react.default.createElement(_Svg.CareRightFilled, {
              className: getIconCls(),
              thumbnailsControl: thumbnailsControl,
            })
          )
        : null
    )
  );
};

var _default = Card; // 解决safari 和ie浏览器不支持  scroll-behavior: smooth;
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

exports.default = _default;
