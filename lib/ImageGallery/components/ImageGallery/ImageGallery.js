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

var _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator')
);

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
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

var _Message = require('../Message');

var _Toast = _interopRequireDefault(require('../Toast'));

var _lodashEs = require('lodash-es');

var _classnames = _interopRequireDefault(require('classnames'));

var _Slider = _interopRequireDefault(require('../Slider'));

var _ImageSlide = _interopRequireDefault(require('../ImageSlide'));

var _Header = _interopRequireDefault(require('../Header'));

var _Svg = require('../Svg');

var _ClipLoader = _interopRequireDefault(require('../Loading/ClipLoader'));

var _Tooltip = _interopRequireDefault(require('../Tooltip'));

var _config = require('../../config');

var _utils = require('../../utils');

var ImageGallery = function ImageGallery(_ref) {
  var props = (0, _extends2.default)({}, _ref);
  var _props$thumbnailsSlid = props.thumbnailsSlideMobileCount,
    thumbnailsSlideMobileCount =
      _props$thumbnailsSlid === void 0 ? 1 : _props$thumbnailsSlid,
    prefixCls = props.prefixCls,
    items = props.items,
    delCb = props.delCb,
    outBrowsing = props.outBrowsing,
    _props$zIndex = props.zIndex,
    zIndex = _props$zIndex === void 0 ? 1000 : _props$zIndex,
    _props$showTitle = props.showTitle,
    showTitle = _props$showTitle === void 0 ? true : _props$showTitle,
    className = props.className,
    configurations = props.configurations;
  var Slider = (0, _react.useRef)(); // Slider.current.slickPrev()

  var SliderThumbnails = (0, _react.useRef)(null); // Slider.current.slickPrev()

  var _useState = (0, _react.useState)(
      (configurations === null || configurations === void 0
        ? void 0
        : configurations.initialSlide) || 0
    ),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    currentIndex = _useState2[0],
    setCurrentIndex = _useState2[1]; // 当前展示幻灯片索引
  // 操作样式

  var _useState3 = (0, _react.useState)(_config.defaultController),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    controller = _useState4[0],
    setController = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    isDownloading = _useState6[0],
    setIsDownloading = _useState6[1]; // 下载中loading

  var _useState7 = (0, _react.useState)(false),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    isShowToast = _useState8[0],
    setIsShowToast = _useState8[1]; // 缩放大小

  var _useState9 = (0, _react.useState)({
      leftDisable: true,
      rightDisable: false,
    }),
    _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
    thumbnailsControl = _useState10[0],
    setThumbnailsControl = _useState10[1]; // 控制缩略图左右按钮禁用
  // 当前画廊数据

  var _useState11 = (0, _react.useState)(items),
    _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
    imageGalleryItems = _useState12[0],
    setImageGalleryItems = _useState12[1];

  var itemsLength = (0, _react.useMemo)(
    function () {
      return imageGalleryItems.length;
    },
    [imageGalleryItems]
  ); // 处理缩略图左右切换移动按钮 滚动宽度

  var handleControlMobile = function handleControlMobile(isLeft) {
    var scrollLeft = SliderThumbnails.current.scrollLeft;
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
      scrollLeft % _config.thumbnailsSlideWidth >=
      _config.thumbnailsSlideWidth / 2
    ) {
      add +=
        _config.thumbnailsSlideWidth -
        (scrollLeft % _config.thumbnailsSlideWidth);
    } else {
      add -= scrollLeft % _config.thumbnailsSlideWidth;
    }

    isLeft
      ? (SliderThumbnails.current.scrollLeft -=
          _config.thumbnailsSlideWidth * thumbnailsSlideMobileCount - add)
      : (SliderThumbnails.current.scrollLeft +=
          _config.thumbnailsSlideWidth * thumbnailsSlideMobileCount + add);
  }; // 缩略图滚监听

  var handleScroll = (0, _react.useCallback)(
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
        (itemsLength - _config.thumbnailsMaxLength) *
          _config.thumbnailsSlideWidth -
          12
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
    var maxMore = dots.length > _config.thumbnailsMaxLength;
    var isLeft = direction === 'left';
    var Component = isLeft ? _Svg.CareLeftFilled : _Svg.CareRightFilled;
    return (
      maxMore &&
      /*#__PURE__*/ _react.default.createElement(Component, {
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
      !(0, _lodashEs.isEqual)(_config.defaultController, controller) &&
      setController(_config.defaultController)
    );
  }; // 当图片切换前触发钩子

  var _beforeChange = function beforeChange(newIndex) {
    var _SliderThumbnails$cur;

    //  缩略图跟随滚动
    (_SliderThumbnails$cur = SliderThumbnails.current) === null ||
    _SliderThumbnails$cur === void 0
      ? void 0
      : _SliderThumbnails$cur.scrollTo({
          left:
            _config.thumbnailsSlideWidth * newIndex -
            _config.thumbnailsSlideWidth,
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

  var getZindex = (0, _react.useMemo)(function () {
    return {
      zIndex: zIndex,
    };
  }, []);
  var getZindexAdd = (0, _react.useMemo)(function () {
    return {
      zIndex: zIndex + 1,
    };
  }, []); // 下载图片

  var handleDownloadImage = /*#__PURE__*/ (function () {
    var _ref2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/ _regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  _context.prev = 0;
                  setIsDownloading(true);
                  _context.next = 4;
                  return (0, _utils.handleDownload)(
                    imageGalleryItems[currentIndex].src
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
                    _Message.message.warning({
                      content: _context.t0.type,
                      prefixCls: prefixCls,
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
        _Message.message.warning({
          content: '不能再放大了',
          prefixCls: prefixCls,
          style: getZindexAdd,
        });

        return;
      }
    } else {
      if (scale <= 0.25) {
        _Message.message.warning({
          content: '不能再缩小了',
          prefixCls: prefixCls,
          style: getZindexAdd,
        });

        return;
      }
    }

    var sacleProgress = isIn ? scale + 0.25 : scale - 0.25;
    !isShowToast && handleToast(true);
    setController(
      (0, _objectSpread2.default)(
        (0, _objectSpread2.default)({}, controller),
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
      (0, _objectSpread2.default)(
        (0, _objectSpread2.default)({}, controller),
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
    return (0, _classnames.default)(
      [
        (0, _config.getPrefixCls)(
          prefixCls,
          ''.concat(_config.imageGallery, '-icon')
        ),
      ],
      cls
    );
  }; // 获取当前active数据

  var getCurrentSlider = (0, _react.useMemo)(
    function () {
      return imageGalleryItems[currentIndex];
    },
    [currentIndex]
  );
  var getGalleryRender = (0, _react.useMemo)(
    function () {
      return imageGalleryItems.map(function (i) {
        return /*#__PURE__*/ _react.default.createElement(_ImageSlide.default, {
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
  var settings = (0, _objectSpread2.default)(
    (0, _objectSpread2.default)(
      {
        dots: true,
        dotsClass: 'slick-dots slick-thumb '.concat(
          (0, _config.getPrefixCls)(
            prefixCls,
            ''.concat(_config.imageGallery, '-thumbnails')
          )
        ),
        className: (0, _classnames.default)(
          (0, _config.getPrefixCls)(prefixCls, 'slick-slider'),
          (0, _defineProperty2.default)(
            {},
            ''.concat(
              (0, _config.getPrefixCls)(
                prefixCls,
                ''.concat(_config.imageGallery, '-slick-full-screen')
              )
            ),
            itemsLength === 1
          )
        ),
        draggable: false,
        nextArrow: /*#__PURE__*/ _react.default.createElement(
          _Svg.RightOutlined,
          {
            className: getIconCls(),
          }
        ),
        prevArrow: /*#__PURE__*/ _react.default.createElement(
          _Svg.LeftOutlined,
          {
            className: getIconCls(),
          }
        ),
        fade: false,
        customPaging: function customPaging(i) {
          var _imageGalleryItems$i, _imageGalleryItems$i2;

          return /*#__PURE__*/ _react.default.createElement('img', {
            className: ''.concat(
              (0, _config.getPrefixCls)(
                prefixCls,
                ''.concat(_config.imageGallery, '-t-c-img')
              )
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
          return /*#__PURE__*/ _react.default.createElement(
            'div',
            null,
            /*#__PURE__*/ _react.default.createElement(
              'div',
              {
                className: ''.concat(
                  (0, _config.getPrefixCls)(
                    prefixCls,
                    ''.concat(_config.imageGallery, '-control')
                  )
                ),
              },
              /*#__PURE__*/ _react.default.createElement(
                'div',
                {
                  className: ''.concat(
                    (0, _config.getPrefixCls)(
                      prefixCls,
                      ''.concat(_config.imageGallery, '-control-icon')
                    )
                  ),
                },
                /*#__PURE__*/ _react.default.createElement(
                  _Tooltip.default,
                  {
                    text: '\u653E\u5927',
                    style: getZindexAdd,
                  },
                  /*#__PURE__*/ _react.default.createElement(_Svg.ZoomIn, {
                    onClick: function onClick() {
                      return handleZoom('ZoomIn');
                    },
                    className: getIconCls(),
                  })
                ),
                /*#__PURE__*/ _react.default.createElement(
                  _Tooltip.default,
                  {
                    text: '\u7F29\u5C0F',
                    style: getZindexAdd,
                  },
                  /*#__PURE__*/ _react.default.createElement(_Svg.ZoomOut, {
                    onClick: function onClick() {
                      return handleZoom('ZoomOut');
                    },
                    className: getIconCls(),
                  })
                ),
                /*#__PURE__*/ _react.default.createElement(
                  _Tooltip.default,
                  {
                    text: '\u5DE6\u65CB\u8F6C',
                    style: getZindexAdd,
                  },
                  /*#__PURE__*/ _react.default.createElement(_Svg.RotateLeft, {
                    onClick: function onClick() {
                      return handleRotate('RotateLeft');
                    },
                    className: getIconCls(),
                  })
                ),
                /*#__PURE__*/ _react.default.createElement(
                  _Tooltip.default,
                  {
                    text: '\u53F3\u65CB\u8F6C',
                    style: getZindexAdd,
                  },
                  /*#__PURE__*/ _react.default.createElement(_Svg.RotateRight, {
                    onClick: function onClick() {
                      return handleRotate('RotateRight');
                    },
                    className: getIconCls(),
                  })
                ),
                /*#__PURE__*/ _react.default.createElement(
                  _Tooltip.default,
                  {
                    text: '\u4E0B\u8F7D',
                    style: getZindexAdd,
                  },
                  /*#__PURE__*/ _react.default.createElement(_Svg.Download, {
                    onClick: handleDownloadImage,
                    className: getIconCls(),
                  })
                ),
                /*#__PURE__*/ _react.default.createElement(
                  _Tooltip.default,
                  {
                    text: '\u5220\u9664',
                    style: getZindexAdd,
                  },
                  /*#__PURE__*/ _react.default.createElement(_Svg.Delate, {
                    onClick: handleDel,
                    className: getIconCls(),
                  })
                )
              ),
              /*#__PURE__*/ _react.default.createElement(
                'div',
                {
                  className: ''.concat(
                    (0, _config.getPrefixCls)(
                      prefixCls,
                      ''.concat(_config.imageGallery, '-control-pagination')
                    )
                  ),
                },
                ''.concat(currentIndex + 1, '/').concat(itemsLength)
              )
            ),
            getControlMobileBtn(dots, 'left'),
            /*#__PURE__*/ _react.default.createElement(
              'div',
              {
                className: ''.concat(
                  (0, _config.getPrefixCls)(
                    prefixCls,
                    ''.concat(_config.imageGallery, '-thumbnails-content')
                  )
                ),
              },
              /*#__PURE__*/ _react.default.createElement(
                'ul',
                {
                  className: ''.concat(
                    (0, _config.getPrefixCls)(
                      prefixCls,
                      ''.concat(_config.imageGallery, '-t-c-ul')
                    )
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
  var wrapCls = (0, _classnames.default)(
    (0, _config.getPrefixCls)(prefixCls),
    (0, _defineProperty2.default)({}, ''.concat(className), className)
  );
  return /*#__PURE__*/ _react.default.createElement(
    'div',
    {
      className: wrapCls,
      style: getZindex,
    },
    /*#__PURE__*/ _react.default.createElement(
      _Header.default,
      {
        currentSlider: getCurrentSlider,
        showTitle: showTitle,
        style: getZindexAdd,
      },
      /*#__PURE__*/ _react.default.createElement(_Svg.Close, {
        className: getIconCls(
          (0, _config.getPrefixCls)(
            prefixCls,
            ''.concat(_config.imageGallery, '-close')
          )
        ),
        onClick: outBrowsing,
      })
    ),
    /*#__PURE__*/ _react.default.createElement(_ClipLoader.default, {
      color: '#108ee9',
      size: 40,
      prefixCls: prefixCls,
      loading: isDownloading,
      zIndex: getZindexAdd.zIndex,
    }),
    /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        className: (0, _config.getPrefixCls)(
          prefixCls,
          ''.concat(_config.wrapperCls, '-container')
        ),
      },
      /*#__PURE__*/ _react.default.createElement(
        _Slider.default,
        {
          sliderWrapper: Slider,
          settings: settings,
        },
        getGalleryRender
      )
    ),
    /*#__PURE__*/ _react.default.createElement(_Toast.default, {
      show: isShowToast,
      sacleProgress: controller.scale,
      style: getZindexAdd,
    })
  );
};

var _default = ImageGallery;
exports.default = _default;
