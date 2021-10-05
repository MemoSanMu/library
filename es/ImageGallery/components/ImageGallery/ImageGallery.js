import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import _asyncToGenerator from '@babel/runtime/helpers/esm/asyncToGenerator';
import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';
import _extends from '@babel/runtime/helpers/esm/extends';
import React, { useRef, useState, useMemo, useCallback } from 'react';
import { isEqual } from 'lodash-es';
import classNames from 'classnames';
import Message from '@/ImageGallery/components/Message';
import Toast from '@/ImageGallery/components/Toast';
import SliderWrapper from '@/ImageGallery/components/Slider';
import ImageSlide from '@/ImageGallery/components/ImageSlide';
import Header from '@/ImageGallery/components/Header';
import ClipLoader from '@/ImageGallery/components/Loading/ClipLoader';
import Tooltip from '@/ImageGallery/components/Tooltip';
import {
  RightOutlined,
  LeftOutlined,
  CareLeftFilled,
  CareRightFilled,
  ZoomOut,
  ZoomIn,
  RotateLeft,
  RotateRight,
  Download,
  Delate,
  Warning,
  Close,
} from '@/ImageGallery/components/Svg';
import {
  thumbnailsMaxLength,
  thumbnailsSlideWidth,
  defaultController,
  imageGallery,
  getPrefixCls,
  wrapperCls,
} from '@/ImageGallery/config';
import { handleDownload } from '@/ImageGallery/utils';

var ImageGallery = function ImageGallery(_ref) {
  var props = _extends({}, _ref);

  var _props$thumbnailsSlid = props.thumbnailsSlideMobileCount,
    thumbnailsSlideMobileCount =
      _props$thumbnailsSlid === void 0 ? 1 : _props$thumbnailsSlid,
    prefixCls = props.prefixCls,
    items = props.items,
    _props$initialSlide = props.initialSlide,
    initialSlide = _props$initialSlide === void 0 ? 0 : _props$initialSlide,
    delCb = props.delCb,
    outBrowsing = props.outBrowsing,
    _props$zIndex = props.zIndex,
    zIndex = _props$zIndex === void 0 ? 1000 : _props$zIndex,
    _props$showTitle = props.showTitle,
    showTitle = _props$showTitle === void 0 ? true : _props$showTitle;
  var Slider = useRef(); // Slider.current.slickPrev()

  var SliderThumbnails = useRef(null); // Slider.current.slickPrev()

  var _useState = useState(initialSlide),
    _useState2 = _slicedToArray(_useState, 2),
    currentIndex = _useState2[0],
    setCurrentIndex = _useState2[1]; // 当前展示幻灯片索引
  // 操作样式

  var _useState3 = useState({
      rotate: 0,
      scale: 1,
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    controller = _useState4[0],
    setController = _useState4[1];

  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isDownloading = _useState6[0],
    setIsDownloading = _useState6[1]; // 下载中loading

  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isShowToast = _useState8[0],
    setIsShowToast = _useState8[1]; // 缩放大小

  var _useState9 = useState({
      leftDisable: true,
      rightDisable: false,
    }),
    _useState10 = _slicedToArray(_useState9, 2),
    thumbnailsControl = _useState10[0],
    setThumbnailsControl = _useState10[1]; // 控制缩略图左右按钮禁用
  // 当前画廊数据

  var _useState11 = useState(items),
    _useState12 = _slicedToArray(_useState11, 2),
    imageGalleryItems = _useState12[0],
    setImageGalleryItems = _useState12[1];

  var itemsLength = imageGalleryItems.length; // 处理缩略图左右切换移动按钮 滚动宽度

  var handleControlMobile = function handleControlMobile(isLeft) {
    var scrollLeft = SliderThumbnails.current.scrollLeft;
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

    if (scrollLeft % thumbnailsSlideWidth >= thumbnailsSlideWidth / 2) {
      add += thumbnailsSlideWidth - (scrollLeft % thumbnailsSlideWidth);
    } else {
      add -= scrollLeft % thumbnailsSlideWidth;
    }

    isLeft
      ? (SliderThumbnails.current.scrollLeft -=
          thumbnailsSlideWidth * thumbnailsSlideMobileCount - add)
      : (SliderThumbnails.current.scrollLeft +=
          thumbnailsSlideWidth * thumbnailsSlideMobileCount + add);
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
      (itemsLength - thumbnailsMaxLength) * thumbnailsSlideWidth
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
  }, []); // 获取缩略图左右切换移动按钮

  var getControlMobileBtn = function getControlMobileBtn(dots, direction) {
    var maxMore = dots.length >= thumbnailsMaxLength;
    var isLeft = direction === 'left';
    var Component = isLeft ? CareLeftFilled : CareRightFilled;
    return (
      maxMore &&
      /*#__PURE__*/ React.createElement(Component, {
        onClick: function onClick() {
          return handleControlMobile(isLeft);
        },
        className: getIconCls(),
        thumbnailsControl: thumbnailsControl,
      })
    );
  }; // 当图片切换前触发钩子

  var beforeChange = function beforeChange(_, newIndex) {
    setCurrentIndex(newIndex); // 保存当前newIndex
    // 当控制旋转和缩放的值不同时 将恢复默认值

    !isEqual(defaultController, controller) && setController(defaultController);
  }; // 初始化

  var onInit = function onInit() {};

  var handleToast = function handleToast(isShowToast) {
    setIsShowToast(isShowToast);
    setTimeout(function () {
      setIsShowToast(false);
    }, 2000);
  }; // 下载图片

  var handleDownloadImage = /*#__PURE__*/ (function () {
    var _ref2 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  _context.prev = 0;
                  setIsDownloading(true);
                  _context.next = 4;
                  return handleDownload(imageGalleryItems[currentIndex].src);

                case 4:
                  _context.next = 9;
                  break;

                case 6:
                  _context.prev = 6;
                  _context.t0 = _context['catch'](0);
                  console.log(_context.t0, 'error');

                case 9:
                  setIsDownloading(false);

                case 10:
                case 'end':
                  return _context.stop();
              }
            }
          },
          _callee,
          null,
          [[0, 6]]
        );
      })
    );

    return function handleDownloadImage() {
      return _ref2.apply(this, arguments);
    };
  })(); // 处理缩放

  var handleZoom = function handleZoom(zoomType) {
    var scale = controller.scale,
      isIn = zoomType === 'ZoomIn'; // 放大

    if (isIn) {
      if (scale >= 2) {
        Message({
          content: '不能再放大了',
          icon: /*#__PURE__*/ React.createElement(
            'span',
            null,
            /*#__PURE__*/ React.createElement(Warning, null)
          ),
          duration: 3,
          className: ''.concat(
            getPrefixCls(prefixCls, ''.concat(imageGallery, '-rc-notification'))
          ),
        });
        return;
      }
    } else {
      if (scale <= 0.25) {
        Message({
          content: '不能再缩小了',
          icon: /*#__PURE__*/ React.createElement(
            'span',
            null,
            /*#__PURE__*/ React.createElement(Warning, null)
          ),
          duration: 3,
          className: ''.concat(
            getPrefixCls(prefixCls, ''.concat(imageGallery, '-rc-notification'))
          ),
        });
        return;
      }
    }

    var sacleProgress = isIn ? scale + 0.25 : scale - 0.25;
    !isShowToast && handleToast(true);
    setController(
      _objectSpread(
        _objectSpread({}, controller),
        {},
        {
          scale: sacleProgress,
        }
      )
    );
  }; // 处理旋转

  var handleRotate = function handleRotate(rotateType) {
    var rotate = controller.rotate,
      isRotateLeft = rotateType === 'RotateLeft';
    setController(
      _objectSpread(
        _objectSpread({}, controller),
        {},
        {
          rotate: isRotateLeft ? rotate - 90 : rotate + 90,
        }
      )
    );
  }; // 删除

  var handleDel = function handleDel() {
    var filterImageGalleryItems = imageGalleryItems.filter(function (item, i) {
      if (currentIndex !== i) {
        return item;
      }
    });
    setImageGalleryItems(filterImageGalleryItems);
    delCb && delCb(filterImageGalleryItems);
  };

  var getIconCls = function getIconCls(cls) {
    return classNames(
      [getPrefixCls(prefixCls, ''.concat(imageGallery, '-icon'))],
      cls
    );
  }; // 获取当前active数据

  var getCurrentSlider = useMemo(
    function () {
      return imageGalleryItems[currentIndex];
    },
    [currentIndex]
  );
  var getGalleryRender = useMemo(
    function () {
      return imageGalleryItems.map(function (i) {
        return /*#__PURE__*/ React.createElement(ImageSlide, {
          item: i,
          key: i.src,
          prefixCls: prefixCls,
          controller: controller,
          itemsLength: itemsLength,
        });
      });
    },
    [imageGalleryItems, controller]
  );
  var settings = {
    dots: true,
    dotsClass: 'slick-dots slick-thumb '.concat(
      getPrefixCls(prefixCls, ''.concat(imageGallery, '-thumbnails'))
    ),
    className: classNames(
      getPrefixCls(prefixCls, 'slick-slider'),
      _defineProperty(
        {},
        ''.concat(
          getPrefixCls(prefixCls, ''.concat(imageGallery, '-slick-full-screen'))
        ),
        itemsLength === 1
      )
    ),
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    lazyLoad: true,
    // fade: true, // fade动画方式切换
    slidesToScroll: 1,
    draggable: false,
    nextArrow: /*#__PURE__*/ React.createElement(RightOutlined, {
      className: getIconCls(),
    }),
    prevArrow: /*#__PURE__*/ React.createElement(LeftOutlined, {
      className: getIconCls(),
    }),
    zIndex: zIndex,
    initialSlide: initialSlide,
    customPaging: function customPaging(i) {
      var _imageGalleryItems$i;

      return /*#__PURE__*/ React.createElement('img', {
        className: ''.concat(
          getPrefixCls(prefixCls, ''.concat(imageGallery, '-t-c-img'))
        ),
        src:
          (_imageGalleryItems$i = imageGalleryItems[i]) === null ||
          _imageGalleryItems$i === void 0
            ? void 0
            : _imageGalleryItems$i.src,
      });
    },
    appendDots: function appendDots(dots) {
      return /*#__PURE__*/ React.createElement(
        'div',
        null,
        /*#__PURE__*/ React.createElement(
          'div',
          {
            className: ''.concat(
              getPrefixCls(prefixCls, ''.concat(imageGallery, '-control'))
            ),
          },
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: ''.concat(
                getPrefixCls(
                  prefixCls,
                  ''.concat(imageGallery, '-control-icon')
                )
              ),
            },
            /*#__PURE__*/ React.createElement(
              Tooltip,
              {
                text: '\u653E\u5927',
              },
              /*#__PURE__*/ React.createElement(ZoomIn, {
                onClick: function onClick() {
                  return handleZoom('ZoomIn');
                },
                className: getIconCls(),
              })
            ),
            /*#__PURE__*/ React.createElement(
              Tooltip,
              {
                text: '\u7F29\u5C0F',
              },
              /*#__PURE__*/ React.createElement(ZoomOut, {
                onClick: function onClick() {
                  return handleZoom('ZoomOut');
                },
                className: getIconCls(),
              })
            ),
            /*#__PURE__*/ React.createElement(
              Tooltip,
              {
                text: '\u5DE6\u65CB\u8F6C',
              },
              /*#__PURE__*/ React.createElement(RotateLeft, {
                onClick: function onClick() {
                  return handleRotate('RotateLeft');
                },
                className: getIconCls(),
              })
            ),
            /*#__PURE__*/ React.createElement(
              Tooltip,
              {
                text: '\u53F3\u65CB\u8F6C',
              },
              /*#__PURE__*/ React.createElement(RotateRight, {
                onClick: function onClick() {
                  return handleRotate('RotateRight');
                },
                className: getIconCls(),
              })
            ),
            /*#__PURE__*/ React.createElement(
              Tooltip,
              {
                text: '\u4E0B\u8F7D',
              },
              /*#__PURE__*/ React.createElement(Download, {
                onClick: handleDownloadImage,
                className: getIconCls(),
              })
            ),
            /*#__PURE__*/ React.createElement(
              Tooltip,
              {
                text: '\u5220\u9664',
              },
              /*#__PURE__*/ React.createElement(Delate, {
                onClick: handleDel,
                className: getIconCls(),
              })
            )
          ),
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: ''.concat(
                getPrefixCls(
                  prefixCls,
                  ''.concat(imageGallery, '-control-pagination')
                )
              ),
            },
            ''.concat(currentIndex + 1, '/').concat(itemsLength)
          )
        ),
        getControlMobileBtn(dots, 'left'),
        /*#__PURE__*/ React.createElement(
          'div',
          {
            className: ''.concat(
              getPrefixCls(
                prefixCls,
                ''.concat(imageGallery, '-thumbnails-content')
              )
            ),
          },
          /*#__PURE__*/ React.createElement(
            'ul',
            {
              className: ''.concat(
                getPrefixCls(prefixCls, ''.concat(imageGallery, '-t-c-ul'))
              ),
              ref: SliderThumbnails,
              onScroll: handleScroll,
            },
            dots
          )
        ),
        getControlMobileBtn(dots, 'right')
      );
    },
    beforeChange: beforeChange,
    onInit: onInit,
  };
  var wrapCls = classNames(getPrefixCls(prefixCls), {});
  return /*#__PURE__*/ React.createElement(
    'div',
    {
      className: wrapCls,
    },
    /*#__PURE__*/ React.createElement(
      Header,
      {
        currentSlider: getCurrentSlider,
        showTitle: showTitle,
      },
      /*#__PURE__*/ React.createElement(Close, {
        className: getIconCls(
          getPrefixCls(prefixCls, ''.concat(imageGallery, '-close'))
        ),
        onClick: outBrowsing,
      })
    ),
    /*#__PURE__*/ React.createElement(ClipLoader, {
      color: '#108ee9',
      size: 40,
      prefixCls: prefixCls,
      loading: isDownloading,
    }),
    /*#__PURE__*/ React.createElement(
      'div',
      {
        className: getPrefixCls(prefixCls, ''.concat(wrapperCls, '-container')),
      },
      /*#__PURE__*/ React.createElement(
        SliderWrapper,
        {
          sliderWrapper: Slider,
          settings: settings,
        },
        getGalleryRender
      )
    ),
    /*#__PURE__*/ React.createElement(Toast, {
      show: isShowToast,
      sacleProgress: controller.scale,
    })
  );
};

export default ImageGallery;
