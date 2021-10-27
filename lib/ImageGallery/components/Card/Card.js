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
 * @LastEditTime: 2021-10-12 15:21:59
 */
var Card = function Card(_ref) {
  var props = (0, _extends2.default)({}, _ref);
  var items = props.items,
    _props$thumbnailsSlid = props.thumbnailsSlideMobileCount,
    thumbnailsSlideMobileCount =
      _props$thumbnailsSlid === void 0 ? 1 : _props$thumbnailsSlid,
    _props$isShowCardSwit = props.isShowCardSwitchBtn,
    isShowCardSwitchBtn =
      _props$isShowCardSwit === void 0 ? true : _props$isShowCardSwit,
    className = props.className,
    configurations = props.configurations,
    cardThumbnailsMaxLength = props.cardThumbnailsMaxLength; // 当前画廊数据

  var _useState = (0, _react.useState)(items),
    _useState2 = (0, _slicedToArray2.default)(_useState, 1),
    imageGalleryItems = _useState2[0];

  var _useState3 = (0, _react.useState)(
      (configurations === null || configurations === void 0
        ? void 0
        : configurations.initialSlide) || 0
    ),
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

  var itemsLength = imageGalleryItems.length;
  (0, _react.useEffect)(function () {
    // 初始化传入initialSlide 在大于0和小于itemsLength的区间内
    if (currentIndex > 0 && currentIndex < itemsLength) {
      var _SliderThumbnails$cur;

      //  缩略图跟随滚动
      SliderThumbnails === null || SliderThumbnails === void 0
        ? void 0
        : (_SliderThumbnails$cur = SliderThumbnails.current) === null ||
          _SliderThumbnails$cur === void 0
        ? void 0
        : _SliderThumbnails$cur.scrollTo({
            left:
              _config.cardThumbnailsSlideWidth * currentIndex -
              _config.cardThumbnailsSlideWidth,
            behavior: 'smooth',
          });
    }

    return function () {};
  }, []); // 当图片切换前触发钩子

  var _beforeChange = function beforeChange(newIndex) {
    var _SliderThumbnails$cur2;

    //  缩略图跟随滚动
    (_SliderThumbnails$cur2 = SliderThumbnails.current) === null ||
    _SliderThumbnails$cur2 === void 0
      ? void 0
      : _SliderThumbnails$cur2.scrollTo({
          left:
            _config.cardThumbnailsSlideWidth * newIndex -
            _config.cardThumbnailsSlideWidth,
          behavior: 'smooth',
        });
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

  var settings = (0, _objectSpread2.default)(
    (0, _objectSpread2.default)(
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
    return (0, _classnames.default)(
      [
        (0, _config.getPrefixCls)(
          _config.rootPrefix,
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
      (itemsLength -
        (cardThumbnailsMaxLength || _config.cardThumbnailsMaxLength)) *
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
    (0, _config.getPrefixCls)(_config.rootPrefix, _config.imageGalleryCard),
    (0, _defineProperty2.default)(
      {
        control: getIsShowCardSwitchBtn,
      },
      ''.concat(className),
      className
    )
  );
  return /*#__PURE__*/ _react.default.createElement(
    _react.default.Fragment,
    null,
    itemsLength
      ? /*#__PURE__*/ _react.default.createElement(
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
                      _config.rootPrefix,
                      ''.concat(_config.imageGalleryCard, '-image-content')
                    ),
                  },
                  /*#__PURE__*/ _react.default.createElement('img', {
                    src: i.src,
                    alt: i.alt,
                    className: (0, _config.getPrefixCls)(
                      _config.rootPrefix,
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
                  _config.rootPrefix,
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
                        _config.rootPrefix,
                        ''.concat(
                          _config.imageGalleryCard,
                          '-thumbnails-control'
                        )
                      )
                    ),
                    onClick: function onClick() {
                      return handleThumbnailsMove('left');
                    },
                  },
                  /*#__PURE__*/ _react.default.createElement(
                    _Svg.CareLeftFilled,
                    {
                      className: getIconCls(),
                      thumbnailsControl: thumbnailsControl,
                    }
                  )
                )
              : null,
            /*#__PURE__*/ _react.default.createElement(
              'ul',
              {
                className: (0, _classnames.default)(
                  ''.concat(
                    (0, _config.getPrefixCls)(
                      _config.rootPrefix,
                      ''.concat(_config.imageGalleryCard, '-t-c-ul')
                    )
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
                  return /*#__PURE__*/ _react.default.createElement(
                    'li',
                    {
                      key: i.src,
                      className: (0, _classnames.default)(
                        (0, _config.getPrefixCls)(
                          _config.rootPrefix,
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
                          _config.rootPrefix,
                          ''.concat(_config.imageGalleryCard, '-t-c-img')
                        )
                      ),
                      src: i.src,
                      alt: i.alt,
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
                        _config.rootPrefix,
                        ''.concat(
                          _config.imageGalleryCard,
                          '-thumbnails-control'
                        )
                      )
                    ),
                    onClick: function onClick() {
                      return handleThumbnailsMove('right');
                    },
                  },
                  /*#__PURE__*/ _react.default.createElement(
                    _Svg.CareRightFilled,
                    {
                      className: getIconCls(),
                      thumbnailsControl: thumbnailsControl,
                    }
                  )
                )
              : null
          )
        )
      : null
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
