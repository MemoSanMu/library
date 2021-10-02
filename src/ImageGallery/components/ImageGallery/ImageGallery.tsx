import React, { FC, useRef, useState, useMemo } from 'react';
import Message from '../Message';
import Toast from '../Toast';
import { isEqual } from 'lodash-es';
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
  Warning,
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
} from '../../config';
import { handleDownload } from '../../utils';
import {
  Items,
  Direction,
  ImageGalleryProps,
  Controller,
  ThumbnailsControl,
} from '../../interfaces';

interface GalleryProps extends ImageGalleryProps {
  outBrowsing: () => void;
}

const ImageGallery: FC<GalleryProps> = ({ ...props }) => {
  const {
    thumbnailsSlideMobileCount = 1,
    prefixCls,
    items,
    initialSlide = 0,
    delCb,
    outBrowsing,
    zIndex,
    showTitle = true,
  } = props;
  const Slider = useRef<any>(); // Slider.current.slickPrev()
  const SliderThumbnails = useRef<any>(null); // Slider.current.slickPrev()

  const [currentIndex, setCurrentIndex] = useState<number>(initialSlide); // 当前展示幻灯片索引
  // 操作样式
  const [controller, setController] = useState<Controller>({
    rotate: 0,
    scale: 1,
  });

  const [isDownloading, setIsDownloading] = useState<boolean>(false); // 下载中loading

  const [isShowToast, setIsShowToast] = useState<boolean>(false); // 缩放大小
  const [thumbnailsControl, setThumbnailsControl] = useState<ThumbnailsControl>(
    {
      leftDisable: true,
      rightDisable: false,
    },
  ); // 控制缩略图左右按钮禁用

  // 当前画廊数据
  const [imageGalleryItems, setImageGalleryItems] = useState<Items[]>(items);

  const itemsLength = imageGalleryItems.length;

  // 处理缩略图左右切换移动按钮 滚动宽度
  const handleControlMobile = (isLeft: boolean) => {
    const scrollLeft = SliderThumbnails.current.scrollLeft;
    let add = 0;
    const setThumbnails = isLeft
      ? {
          ...thumbnailsControl,
          rightDisable: false,
        }
      : {
          ...thumbnailsControl,
          leftDisable: false,
        };
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
  };

  // 缩略图滚监听
  const handleScroll = (e: any) => {
    e.persist();
    const { leftDisable, rightDisable } = thumbnailsControl;
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
  };

  // 获取缩略图左右切换移动按钮
  const getControlMobileBtn = (
    dots: React.ReactDOM[],
    direction: Direction,
  ) => {
    const maxMore = dots.length >= thumbnailsMaxLength;
    const isLeft = direction === 'left';
    const Component = isLeft ? CareLeftFilled : CareRightFilled;
    return (
      maxMore && (
        <Component
          onClick={() => handleControlMobile(isLeft)}
          className={getIconCls()}
          thumbnailsControl={thumbnailsControl}
        />
      )
    );
  };

  // 当图片切换前触发钩子
  const beforeChange = (_: number, newIndex: number) => {
    setCurrentIndex(newIndex); // 保存当前newIndex
    // 当控制旋转和缩放的值不同时 将恢复默认值
    !isEqual(defaultController, controller) && setController(defaultController);
  };

  // 初始化
  const onInit = () => {};

  const handleToast = (isShowToast: boolean) => {
    setIsShowToast(isShowToast);
    setTimeout(() => {
      setIsShowToast(false);
    }, 2000);
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
        Message({
          content: '不能再放大了',
          icon: (
            <span>
              <Warning />
            </span>
          ),
          duration: 3,
          className: `${getPrefixCls(
            prefixCls,
            `${imageGallery}-rc-notification`,
          )}`,
        });
        return;
      }
    } else {
      if (scale <= 0.25) {
        Message({
          content: '不能再缩小了',
          icon: (
            <span>
              <Warning />
            </span>
          ),
          duration: 3,
          className: `${getPrefixCls(
            prefixCls,
            `${imageGallery}-rc-notification`,
          )}`,
        });
        return;
      }
    }
    const sacleProgress = isIn ? scale + 0.25 : scale - 0.25;
    handleToast(true);
    setController({
      ...controller,
      scale: sacleProgress,
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

  const getIconCls = (cls?: string) => {
    return classNames([getPrefixCls(prefixCls, `${imageGallery}-icon`)], cls);
  };

  // 获取当前active数据
  const getCurrentSlider = useMemo(() => {
    return imageGalleryItems[currentIndex];
  }, [currentIndex]);

  const getGalleryRender = useMemo(() => {
    return imageGalleryItems.map((i: Items) => (
      <ImageSlide
        item={i}
        key={i.src}
        prefixCls={prefixCls}
        controller={controller}
        itemsLength={itemsLength}
      />
    ));
  }, [imageGalleryItems]);

  const settings = {
    dots: true,
    dotsClass: `slick-dots slick-thumb ${getPrefixCls(
      prefixCls,
      `${imageGallery}-thumbnails`,
    )}`,
    className: classNames(getPrefixCls(prefixCls, 'slick-slider'), {
      [`${getPrefixCls(prefixCls, `${imageGallery}-slick-full-screen`)}`]:
        itemsLength === 1,
    }),
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    lazyLoad: true,
    // fade: true, // fade动画方式切换
    slidesToScroll: 1,
    draggable: false,
    nextArrow: <RightOutlined className={getIconCls()} />,
    prevArrow: <LeftOutlined className={getIconCls()} />,
    zIndex,
    initialSlide, // 第一张幻灯片的索引
    customPaging: function (i: number) {
      return (
        <img
          className={`${getPrefixCls(prefixCls, `${imageGallery}-t-c-img`)}`}
          src={imageGalleryItems[i]?.src}
        />
      );
    },
    appendDots: (dots: React.ReactDOM[]) => {
      return (
        <div>
          {/* 控制区域 */}
          <div
            className={`${getPrefixCls(prefixCls, `${imageGallery}-control`)}`}
          >
            <div
              className={`${getPrefixCls(
                prefixCls,
                `${imageGallery}-control-icon`,
              )}`}
            >
              {/* 放大 */}
              <Tooltip text="放大">
                <ZoomIn
                  onClick={() => handleZoom('ZoomIn')}
                  className={getIconCls()}
                />
              </Tooltip>
              <Tooltip text="缩小">
                <ZoomOut
                  onClick={() => handleZoom('ZoomOut')}
                  className={getIconCls()}
                />
              </Tooltip>
              <Tooltip text="左旋转">
                <RotateLeft
                  onClick={() => handleRotate('RotateLeft')}
                  className={getIconCls()}
                />
              </Tooltip>
              <Tooltip text="右旋转">
                <RotateRight
                  onClick={() => handleRotate('RotateRight')}
                  className={getIconCls()}
                />
              </Tooltip>
              <Tooltip text="下载">
                <Download
                  onClick={handleDownloadImage}
                  className={getIconCls()}
                />
              </Tooltip>
              <Tooltip text="删除">
                <Delate onClick={handleDel} className={getIconCls()} />
              </Tooltip>
            </div>
            <div
              className={`${getPrefixCls(
                prefixCls,
                `${imageGallery}-control-pagination`,
              )}`}
            >
              {`${currentIndex + 1}/${itemsLength}`}
            </div>
          </div>
          {/* 缩略图左侧滑动按钮 */}
          {getControlMobileBtn(dots, 'left')}
          {/* 缩略图区域 */}
          <div
            className={`${getPrefixCls(
              prefixCls,
              `${imageGallery}-thumbnails-content`,
            )}`}
          >
            <ul
              className={`${getPrefixCls(prefixCls, `${imageGallery}-t-c-ul`)}`}
              ref={SliderThumbnails}
              onScroll={handleScroll}
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
      {/* header */}
      <Header currentSlider={getCurrentSlider} showTitle={showTitle}>
        {/* close */}
        <Close
          className={getIconCls(
            getPrefixCls(prefixCls, `${imageGallery}-close`),
          )}
          onClick={outBrowsing}
        />
      </Header>

      {/* loading */}
      <ClipLoader
        color={'#108ee9'}
        size={40}
        prefixCls={prefixCls}
        loading={isDownloading}
      />

      {/* slider */}
      <div className={getPrefixCls(prefixCls, `${wrapperCls}-container`)}>
        <SliderWrapper sliderWrapper={Slider} settings={settings}>
          {getGalleryRender}
        </SliderWrapper>
      </div>

      {/* sacle Progress Toast */}
      <Toast show={isShowToast} sacleProgress={controller.scale} />
    </div>
  );
};

export default ImageGallery;
