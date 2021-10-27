import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import _asyncToGenerator from '@babel/runtime/helpers/esm/asyncToGenerator';
import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';
import _extends from '@babel/runtime/helpers/esm/extends';
import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { message } from '../Message';
import Toast from '../Toast';
import { isEqual, debounce } from 'lodash-es';
import classNames from 'classnames';
import SliderWrapper from '../Slider';
import ImageSlide from '../ImageSlide';
import Header from '../Header';
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
  Close,
} from '../Svg';
import ClipLoader from '../Loading/ClipLoader';
import Tooltip from '../Tooltip';
import {
  thumbnailsMaxLength,
  thumbnailsSlideWidth,
  defaultController,
  imageGallery,
  getPrefixCls,
  wrapperCls,
  rootPrefix,
  defaultControllers,
} from '../../config';
import { handleDownload } from '../../utils';

var ImageGallery = function ImageGallery(_ref) {
  var props = _extends({}, _ref);

  var _props$thumbnailsSlid = props.thumbnailsSlideMobileCount,
    thumbnailsSlideMobileCount =
      _props$thumbnailsSlid === void 0 ? 1 : _props$thumbnailsSlid,
    items = props.items,
    delCb = props.delCb,
    outBrowsing = props.outBrowsing,
    _props$zIndex = props.zIndex,
    zIndex = _props$zIndex === void 0 ? 1000 : _props$zIndex,
    _props$showTitle = props.showTitle,
    showTitle = _props$showTitle === void 0 ? true : _props$showTitle,
    className = props.className,
    configurations = props.configurations,
    controllers = props.controllers;
  var Slider = useRef(); // Slider.current.slickPrev()

  var SliderThumbnails = useRef(null); // Slider.current.slickPrev()

  var _useState = useState(
      (configurations === null || configurations === void 0
        ? void 0
        : configurations.initialSlide) || 0
    ),
    _useState2 = _slicedToArray(_useState, 2),
    currentIndex = _useState2[0],
    setCurrentIndex = _useState2[1]; // 当前展示幻灯片索引
  // 操作样式

  var _useState3 = useState(defaultController),
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
    setImageGalleryItems = _useState12[1]; // 获取操作区域按钮

  var getControllers = useMemo(function () {
    return _objectSpread(_objectSpread({}, defaultControllers), controllers);
  }, []); // 获取操作区域宽度

  var getControlsStyle = useMemo(
    function () {
      var countLen = Object.values(getControllers).filter(function (btn) {
        return btn === true;
      }).length;

      if (getControllers.zoom === false) {
        --countLen;
      }

      if (getControllers.rotate === false) {
        --countLen;
      } // 272 为操作区域的总宽,104为1个icon时的宽度,42为单个操作icon的宽度和左右边距

      return {
        width: 104 + 42 * countLen,
        minWidth: 146, // 最小宽度
      };
    },
    [getControllers]
  ); // 是否展示操作区域

  var isShowControls = useMemo(
    function () {
      return Object.values(getControllers).some(function (btn) {
        return btn === true;
      });
    },
    [getControllers]
  );
  var itemsLength = useMemo(
    function () {
      return imageGalleryItems.length;
    },
    [imageGalleryItems]
  );
  useEffect(function () {
    // 初始化传入initialSlide 在大于0和小于itemsLength的区间内
    if (currentIndex > 0 && currentIndex < itemsLength) {
      var _SliderThumbnails$cur;

      //  初始化缩略图跟随滚动
      SliderThumbnails === null || SliderThumbnails === void 0
        ? void 0
        : (_SliderThumbnails$cur = SliderThumbnails.current) === null ||
          _SliderThumbnails$cur === void 0
        ? void 0
        : _SliderThumbnails$cur.scrollTo({
            left: thumbnailsSlideWidth * currentIndex - thumbnailsSlideWidth,
            behavior: 'smooth',
          });
    }

    return function () {};
  }, []); // 处理缩略图左右切换移动按钮 滚动宽度

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

  var handleScroll = useCallback(
    function (e) {
      e.persist();
      var leftDisable = thumbnailsControl.leftDisable,
        rightDisable = thumbnailsControl.rightDisable;

      if (leftDisable || rightDisable) {
        setThumbnailsControl({
          leftDisable: false,
          rightDisable: false,
        });
      } // 滚动左边的距离大于等于可滚动宽度即到最终滚动点（ps：减去12是因为margin-right：12)

      if (
        e.target.scrollLeft >=
        (itemsLength - thumbnailsMaxLength) * thumbnailsSlideWidth - 12
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
    },
    [itemsLength]
  ); // 获取缩略图左右切换移动按钮

  var getControlMobileBtn = function getControlMobileBtn(dots, direction) {
    var maxMore = dots.length > thumbnailsMaxLength;
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
  }; // 当控制旋转和缩放的值不同时 将恢复默认值

  var resetController = function resetController() {
    return (
      !isEqual(defaultController, controller) &&
      setController(defaultController)
    );
  }; // 当图片切换前触发钩子

  var _beforeChange = function beforeChange(newIndex) {
    var _SliderThumbnails$cur2;

    //  缩略图跟随滚动
    (_SliderThumbnails$cur2 = SliderThumbnails.current) === null ||
    _SliderThumbnails$cur2 === void 0
      ? void 0
      : _SliderThumbnails$cur2.scrollTo({
          left: thumbnailsSlideWidth * newIndex - thumbnailsSlideWidth,
          behavior: 'smooth',
        });
    setCurrentIndex(newIndex); // 保存当前newIndex

    resetController();
  };

  var handleToast = function handleToast(isShowToast) {
    setIsShowToast(isShowToast);
    setTimeout(function () {
      setIsShowToast(false);
    }, 2000);
  };

  var getZindex = useMemo(function () {
    return {
      zIndex: zIndex,
    };
  }, []);
  var getZindexAdd = useMemo(function () {
    return {
      zIndex: zIndex + 1,
    };
  }, []); // 下载图片

  var handleDownloadImage = /*#__PURE__*/ (function () {
    var _ref2 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime.mark(function _callee() {
        var _imageGalleryItems$cu;

        return _regeneratorRuntime.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  _context.prev = 0;
                  setIsDownloading(true);
                  _context.next = 4;
                  return handleDownload(
                    (_imageGalleryItems$cu =
                      imageGalleryItems[currentIndex]) === null ||
                      _imageGalleryItems$cu === void 0
                      ? void 0
                      : _imageGalleryItems$cu.src
                  );

                case 4:
                  _context.next = 10;
                  break;

                case 6:
                  _context.prev = 6;
                  _context.t0 = _context['catch'](0);
                  _context.t0 &&
                    (_context.t0 === null || _context.t0 === void 0
                      ? void 0
                      : _context.t0.type) &&
                    message.warning({
                      content: _context.t0.type,
                      prefixCls: rootPrefix,
                      style: getZindexAdd,
                    });
                  console.error(_context.t0, 'error');

                case 10:
                  setIsDownloading(false);

                case 11:
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
        message.warning({
          content: '不能再放大了',
          prefixCls: rootPrefix,
          style: getZindexAdd,
        });
        return;
      }
    } else {
      if (scale <= 0.25) {
        message.warning({
          content: '不能再缩小了',
          prefixCls: rootPrefix,
          style: getZindexAdd,
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
    resetController();
    delCb && delCb(filterImageGalleryItems);
  };

  var getIconCls = function getIconCls(cls) {
    return classNames(
      [getPrefixCls(rootPrefix, ''.concat(imageGallery, '-icon'))],
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
          prefixCls: rootPrefix,
          controller: controller,
          itemsLength: itemsLength,
        });
      });
    },
    [imageGalleryItems, controller]
  );

  var settings = _objectSpread(
    _objectSpread(
      {
        dots: true,
        dotsClass: 'slick-dots slick-thumb '.concat(
          getPrefixCls(rootPrefix, ''.concat(imageGallery, '-thumbnails'))
        ),
        className: classNames(
          getPrefixCls(rootPrefix, 'slick-slider'),
          _defineProperty(
            {},
            ''.concat(
              getPrefixCls(
                rootPrefix,
                ''.concat(imageGallery, '-slick-full-screen')
              )
            ),
            itemsLength === 1
          )
        ),
        draggable: false,
        nextArrow: /*#__PURE__*/ React.createElement(RightOutlined, {
          className: getIconCls(),
        }),
        prevArrow: /*#__PURE__*/ React.createElement(LeftOutlined, {
          className: getIconCls(),
        }),
        fade: false,
        customPaging: function customPaging(i) {
          var _imageGalleryItems$i, _imageGalleryItems$i2;

          return /*#__PURE__*/ React.createElement('img', {
            className: ''.concat(
              getPrefixCls(rootPrefix, ''.concat(imageGallery, '-t-c-img'))
            ),
            src:
              (_imageGalleryItems$i = imageGalleryItems[i]) === null ||
              _imageGalleryItems$i === void 0
                ? void 0
                : _imageGalleryItems$i.src,
            alt:
              (_imageGalleryItems$i2 = imageGalleryItems[i]) === null ||
              _imageGalleryItems$i2 === void 0
                ? void 0
                : _imageGalleryItems$i2.alt,
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
                  getPrefixCls(rootPrefix, ''.concat(imageGallery, '-control'))
                ),
              },
              isShowControls
                ? /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      className: ''.concat(
                        getPrefixCls(
                          rootPrefix,
                          ''.concat(imageGallery, '-control-icon')
                        )
                      ),
                      style: getControlsStyle,
                    },
                    getControllers.zoom
                      ? /*#__PURE__*/ React.createElement(
                          React.Fragment,
                          null,
                          /*#__PURE__*/ React.createElement(
                            Tooltip,
                            {
                              text: '\u653E\u5927',
                              style: getZindexAdd,
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
                              style: getZindexAdd,
                            },
                            /*#__PURE__*/ React.createElement(ZoomOut, {
                              onClick: function onClick() {
                                return handleZoom('ZoomOut');
                              },
                              className: getIconCls(),
                            })
                          )
                        )
                      : null,
                    getControllers.rotate
                      ? /*#__PURE__*/ React.createElement(
                          React.Fragment,
                          null,
                          /*#__PURE__*/ React.createElement(
                            Tooltip,
                            {
                              text: '\u5DE6\u65CB\u8F6C',
                              style: getZindexAdd,
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
                              style: getZindexAdd,
                            },
                            /*#__PURE__*/ React.createElement(RotateRight, {
                              onClick: function onClick() {
                                return handleRotate('RotateRight');
                              },
                              className: getIconCls(),
                            })
                          )
                        )
                      : null,
                    getControllers.download
                      ? /*#__PURE__*/ React.createElement(
                          Tooltip,
                          {
                            text: '\u4E0B\u8F7D',
                            style: getZindexAdd,
                          },
                          /*#__PURE__*/ React.createElement(Download, {
                            onClick: handleDownloadImage,
                            className: getIconCls(),
                          })
                        )
                      : null,
                    getControllers.delete
                      ? /*#__PURE__*/ React.createElement(
                          Tooltip,
                          {
                            text: '\u5220\u9664',
                            style: getZindexAdd,
                          },
                          /*#__PURE__*/ React.createElement(Delate, {
                            onClick: debounce(handleDel, 300, {
                              leading: false,
                              trailing: true,
                            }),
                            className: getIconCls(),
                          })
                        )
                      : null
                  )
                : null,
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: classNames(
                    ''.concat(
                      getPrefixCls(
                        rootPrefix,
                        ''.concat(imageGallery, '-control-pagination')
                      )
                    ),
                    {
                      'hidden-controll': isShowControls === false,
                    }
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
                    rootPrefix,
                    ''.concat(imageGallery, '-thumbnails-content')
                  )
                ),
              },
              /*#__PURE__*/ React.createElement(
                'ul',
                {
                  className: ''.concat(
                    getPrefixCls(rootPrefix, ''.concat(imageGallery, '-t-c-ul'))
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

  var wrapCls = classNames(
    getPrefixCls(rootPrefix),
    _defineProperty({}, ''.concat(className), className)
  );
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    itemsLength
      ? /*#__PURE__*/ React.createElement(
          'div',
          {
            className: wrapCls,
            style: getZindex,
          },
          /*#__PURE__*/ React.createElement(
            Header,
            {
              currentSlider: getCurrentSlider,
              showTitle: showTitle,
              style: getZindexAdd,
            },
            /*#__PURE__*/ React.createElement(Close, {
              className: getIconCls(
                getPrefixCls(rootPrefix, ''.concat(imageGallery, '-close'))
              ),
              onClick: outBrowsing,
            })
          ),
          /*#__PURE__*/ React.createElement(ClipLoader, {
            color: '#108ee9',
            size: 40,
            prefixCls: rootPrefix,
            loading: isDownloading,
            zIndex: getZindexAdd.zIndex,
          }),
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: getPrefixCls(
                rootPrefix,
                ''.concat(wrapperCls, '-container')
              ),
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
            style: getZindexAdd,
          })
        )
      : null
  );
};

export default ImageGallery;
