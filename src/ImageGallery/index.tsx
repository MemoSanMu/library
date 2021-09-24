import React, { FC, useRef, useState, useCallback } from 'react';
import RcTooltip from 'rc-tooltip';
import { isEqual } from 'lodash-es';
import classNames from 'classnames';
import SliderWrapper from './components/Slider';
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
} from './components/Svg';
import ClipLoader from './components/Loading/ClipLoader';
import {
  thumbnailsMaxLength,
  thumbnailsSlideWidth,
  getMaxXMobileRang,
  defaultController,
} from './config/index';
import { handleDownload } from './utils';
import { getPrefixCls, wrapperCls } from './config/index';
import './styles/index.less';
import { Items, Direction, ImageGalleryProps, Controller } from './interfaces';

const ImageGallery: FC<ImageGalleryProps> = (props) => {
  const {
    thumbnailsSlideMobileCount = 1,
    prefixCls,
    items,
    initialSlide = 0,
    delCb,
  } = props;
  const Slider = useRef<any>(); // Slider.current.slickPrev()

  const [thumbnailsMobileW, setThumbnailsMobileW] = useState(0); // 缩略图 累计滚动的x轴宽度
  // 缩略图 滚动样式
  const [thumbnailsStyle, setThumbnailsStyle] = useState<React.CSSProperties>(
    {},
  );
  const [currentIndex, setCurrentIndex] = useState<number>(initialSlide); // 当前展示幻灯片索引
  // 操作样式
  const [controller, setController] = useState<Controller>({
    rotate: 0,
    scale: 1,
  });

  const [isDownloading, setIsDownloading] = useState<boolean>(false); // 下载中loading

  // 当前画廊数据
  const [imageGalleryItems, setImageGalleryItems] = useState<Items[]>(items);
  const itemsLength = imageGalleryItems.length;
  const maxXMobileRange = getMaxXMobileRang(itemsLength);

  // 处理缩略图左右切换移动按钮 滚动宽度
  const handleControlMobile = (isLeft: boolean) => {
    let transX;
    // 这个位置控制缩略图的滚动方向
    // !isLeft = 点左右移; isLeft = 点左左移;
    if (!isLeft) {
      transX =
        -thumbnailsSlideWidth * thumbnailsSlideMobileCount + thumbnailsMobileW;
      if (Math.abs(transX) > maxXMobileRange) {
        transX = -maxXMobileRange;
      }
    } else {
      transX =
        thumbnailsSlideWidth * thumbnailsSlideMobileCount + thumbnailsMobileW;
      if (transX > 0) {
        transX = 0;
      }
    }
    setThumbnailsMobileW(transX);
    setThumbnailsStyle({
      transform: `translate3d(${transX}px, 0px, 0px)`,
    });
  };

  // 获取缩略图左右切换移动按钮
  const getControlMobileBtn = (
    dots: React.ReactDOM[],
    direction: Direction,
  ) => {
    const maxMore = dots.length >= thumbnailsMaxLength;
    const isLeft = direction === 'left';
    const Component = isLeft ? CareLeftFilled : CareRightFilled;
    return maxMore && <Component onClick={() => handleControlMobile(isLeft)} />;
  };

  // 获取当前图片画廊样式
  const getCurrentGalleryImageStyle = useCallback((): React.CSSProperties => {
    const { rotate, scale } = controller;
    return {
      transform: `scale3d(${scale}, ${scale}, 1) rotate3d(0, 0, 1, ${rotate}deg)`,
    };
  }, [controller]);

  // 当图片切换前触发钩子
  const beforeChange = (_: number, newIndex: number) => {
    setCurrentIndex(newIndex); // 保存当前newIndex
    // 当控制旋转和缩放的值不同时 将恢复默认值
    !isEqual(defaultController, controller) && setController(defaultController);
  };

  // 初始化
  const onInit = () => {
    console.log('init');
  };

  // 下载图片
  const handleDownloadImage = async () => {
    try {
      setIsDownloading(true);
      await handleDownload(imageGalleryItems[currentIndex].src);
    } catch (error) {
      console.log(error, 'error');
    }
    setIsDownloading(false);
  };

  // 处理缩放
  const handleZoom = (zoomType: string) => {
    const { scale } = controller,
      isIn = zoomType === 'ZoomIn';
    // 放大
    if (isIn) {
      if (scale >= 2) {
        console.log('不能再放大了');
        return;
      }
    } else {
      if (scale <= 0.25) {
        console.log('不能再缩小了');
        return;
      }
    }
    setController({
      ...controller,
      scale: isIn ? scale + 0.25 : scale - 0.25,
    });
  };

  // 处理旋转
  const handleRotate = (rotateType: string) => {
    const { rotate } = controller,
      isRotateLeft = rotateType === 'RotateLeft';
    setController({
      ...controller,
      rotate: isRotateLeft ? rotate - 90 : rotate + 90,
    });
  };

  // 删除
  const handleDel = () => {
    const filterImageGalleryItems = imageGalleryItems.filter((item, i) => {
      if (currentIndex !== i) {
        return item;
      }
    });

    setImageGalleryItems(filterImageGalleryItems);
    delCb && delCb(filterImageGalleryItems);
  };

  const settings = {
    dots: true,
    dotsClass: `slick-dots slick-thumb ${getPrefixCls(
      prefixCls,
      'i-g-thumbnails',
    )}`,
    className: getPrefixCls(prefixCls, 'slick-slider'),
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    lazyLoad: true,
    slidesToScroll: 1,
    nextArrow: <RightOutlined />,
    prevArrow: <LeftOutlined />,
    initialSlide, // 第一张幻灯片的索引
    customPaging: function (i: number) {
      return (
        <a>
          <img
            className={`${getPrefixCls(prefixCls, 'i-g-t-c-img')}`}
            src={imageGalleryItems[i]?.src}
          />
        </a>
      );
    },
    appendDots: (dots: React.ReactDOM[]) => {
      return (
        <div>
          {/* 控制区域 */}
          <div className={`${getPrefixCls(prefixCls, 'i-g-control')}`}>
            <div className={`${getPrefixCls(prefixCls, 'i-g-control-icon')}`}>
              <RcTooltip
                placement="top"
                overlayClassName={`${getPrefixCls(
                  prefixCls,
                  'i-g-rc-tooltip',
                )}`}
                overlay={<span>放大</span>}
              >
                {/* 放大 */}
                <div>
                  <ZoomIn onClick={() => handleZoom('ZoomIn')} />
                </div>
              </RcTooltip>
              <RcTooltip
                placement="top"
                overlayClassName={`${getPrefixCls(
                  prefixCls,
                  'i-g-rc-tooltip',
                )}`}
                overlay={<span>缩小</span>}
              >
                {/* 缩小 */}
                <div>
                  <ZoomOut onClick={() => handleZoom('ZoomOut')} />
                </div>
              </RcTooltip>
              <RcTooltip
                placement="top"
                overlayClassName={`${getPrefixCls(
                  prefixCls,
                  'i-g-rc-tooltip',
                )}`}
                overlay={<span>左旋转</span>}
              >
                {/* 左旋转 */}
                <div>
                  <RotateLeft onClick={() => handleRotate('RotateLeft')} />
                </div>
              </RcTooltip>
              <RcTooltip
                placement="top"
                overlayClassName={`${getPrefixCls(
                  prefixCls,
                  'i-g-rc-tooltip',
                )}`}
                overlay={<span>右旋转</span>}
              >
                {/* 右旋转 */}
                <div>
                  <RotateRight onClick={() => handleRotate('RotateRight')} />
                </div>
              </RcTooltip>
              <RcTooltip
                placement="top"
                overlayClassName={`${getPrefixCls(
                  prefixCls,
                  'i-g-rc-tooltip',
                )}`}
                overlay={<span>下载</span>}
              >
                {/* 下载 */}
                <div>
                  <Download onClick={handleDownloadImage} />
                </div>
              </RcTooltip>
              <RcTooltip
                placement="top"
                overlayClassName={`${getPrefixCls(
                  prefixCls,
                  'i-g-rc-tooltip',
                )}`}
                overlay={<span>删除</span>}
              >
                {/* 删除 */}
                <div>
                  <Delate onClick={handleDel} />
                </div>
              </RcTooltip>
            </div>
            <div
              className={`${getPrefixCls(prefixCls, 'i-g-control-pagination')}`}
            >
              {`${currentIndex + 1}/${itemsLength}`}
            </div>
          </div>
          {/* 缩略图左侧滑动按钮 */}
          {getControlMobileBtn(dots, 'left')}
          {/* 缩略图区域 */}
          <div
            className={`${getPrefixCls(prefixCls, 'i-g-thumbnails-content')}`}
          >
            <ul
              className={`${getPrefixCls(prefixCls, 'i-g-t-c-ul')}`}
              style={thumbnailsStyle}
            >
              {dots}
            </ul>
          </div>
          {/* 缩略图右测滑动按钮 */}
          {getControlMobileBtn(dots, 'right')}
        </div>
      );
    },
    beforeChange: beforeChange,
    onInit: onInit,
  };

  const wrapCls = classNames(getPrefixCls(prefixCls), {});

  return (
    <div className={wrapCls}>
      <ClipLoader
        color={'#108ee9'}
        size={40}
        prefixCls={prefixCls}
        loading={isDownloading}
      />
      <div className={getPrefixCls(prefixCls, `${wrapperCls}-container`)}>
        <SliderWrapper sliderWrapper={Slider} settings={settings}>
          {imageGalleryItems &&
            imageGalleryItems.map((i: Items) => {
              return (
                <div
                  key={i.src}
                  className={getPrefixCls(prefixCls, 'i-g-image-content')}
                >
                  <img
                    style={getCurrentGalleryImageStyle()}
                    className={getPrefixCls(prefixCls, 'i-g-image')}
                    src={i.src}
                  />
                </div>
              );
            })}
        </SliderWrapper>
      </div>
    </div>
  );
};

export default ImageGallery;
