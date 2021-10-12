import React, { FC, useRef, useState, useMemo, useCallback } from 'react';
import { message } from '../Message';
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
    items,
    delCb,
    outBrowsing,
    zIndex = 1000,
    showTitle = true,
    className,
    configurations,
  } = props;
  const Slider = useRef<any>(); // Slider.current.slickPrev()
  const SliderThumbnails = useRef<any>(null); // Slider.current.slickPrev()

  const [currentIndex, setCurrentIndex] = useState<number>(
    configurations?.initialSlide || 0,
  ); // 当前展示幻灯片索引
  // 操作样式
  const [controller, setController] = useState<Controller>(defaultController);

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

  const itemsLength = useMemo(
    () => imageGalleryItems.length,
    [imageGalleryItems],
  );

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
  const handleScroll = useCallback(
    (e: any) => {
      e.persist();
      const { leftDisable, rightDisable } = thumbnailsControl;
      if (leftDisable || rightDisable) {
        setThumbnailsControl({
          leftDisable: false,
          rightDisable: false,
        });
      }

      // 滚动左边的距离大于等于可滚动宽度即到最终滚动点（ps：减去12是因为margin-right：12)
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
    [itemsLength],
  );

  // 获取缩略图左右切换移动按钮
  const getControlMobileBtn = (
    dots: React.ReactDOM[],
    direction: Direction,
  ) => {
    const maxMore = dots.length > thumbnailsMaxLength;
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

  // 当控制旋转和缩放的值不同时 将恢复默认值
  const resetController = () =>
    !isEqual(defaultController, controller) && setController(defaultController);

  // 当图片切换前触发钩子
  const beforeChange = (newIndex: number) => {
    //  缩略图跟随滚动
    SliderThumbnails.current?.scrollTo({
      left: thumbnailsSlideWidth * newIndex - thumbnailsSlideWidth,
      behavior: 'smooth',
    });
    setCurrentIndex(newIndex); // 保存当前newIndex
    resetController();
  };

  const handleToast = (isShowToast: boolean) => {
    setIsShowToast(isShowToast);
    setTimeout(() => {
      setIsShowToast(false);
    }, 2000);
  };

  const getZindex = useMemo(
    () => ({
      zIndex,
    }),
    [],
  );

  const getZindexAdd = useMemo(
    () => ({
      zIndex: zIndex + 1,
    }),
    [],
  );

  // 下载图片
  const handleDownloadImage = async () => {
    try {
      setIsDownloading(true);
      await handleDownload(imageGalleryItems[currentIndex].src);
    } catch (error: any) {
      error &&
        error?.type &&
        message.warning({
          content: error.type,
          prefixCls: rootPrefix,
          style: getZindexAdd,
        });
      console.error(error, 'error');
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
    const sacleProgress = isIn ? scale + 0.25 : scale - 0.25;
    !isShowToast && handleToast(true);
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
    resetController();
    delCb && delCb(filterImageGalleryItems);
  };

  const getIconCls = (cls?: string) => {
    return classNames([getPrefixCls(rootPrefix, `${imageGallery}-icon`)], cls);
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
        prefixCls={rootPrefix}
        controller={controller}
        itemsLength={itemsLength}
      />
    ));
  }, [imageGalleryItems, controller]);

  const settings = {
    dots: true,
    dotsClass: `slick-dots slick-thumb ${getPrefixCls(
      rootPrefix,
      `${imageGallery}-thumbnails`,
    )}`,
    className: classNames(getPrefixCls(rootPrefix, 'slick-slider'), {
      [`${getPrefixCls(rootPrefix, `${imageGallery}-slick-full-screen`)}`]:
        itemsLength === 1,
    }),
    draggable: false,
    nextArrow: <RightOutlined className={getIconCls()} />,
    prevArrow: <LeftOutlined className={getIconCls()} />,
    fade: false,
    customPaging: function (i: number) {
      return (
        <img
          className={`${getPrefixCls(rootPrefix, `${imageGallery}-t-c-img`)}`}
          src={imageGalleryItems[i]?.src}
          alt={imageGalleryItems[i]?.alt}
        />
      );
    },
    appendDots: (dots: React.ReactDOM[]) => {
      return (
        <div>
          {/* 控制区域 */}
          <div
            className={`${getPrefixCls(rootPrefix, `${imageGallery}-control`)}`}
          >
            <div
              className={`${getPrefixCls(
                rootPrefix,
                `${imageGallery}-control-icon`,
              )}`}
            >
              {/* 放大 */}
              <Tooltip text="放大" style={getZindexAdd}>
                <ZoomIn
                  onClick={() => handleZoom('ZoomIn')}
                  className={getIconCls()}
                />
              </Tooltip>
              <Tooltip text="缩小" style={getZindexAdd}>
                <ZoomOut
                  onClick={() => handleZoom('ZoomOut')}
                  className={getIconCls()}
                />
              </Tooltip>
              <Tooltip text="左旋转" style={getZindexAdd}>
                <RotateLeft
                  onClick={() => handleRotate('RotateLeft')}
                  className={getIconCls()}
                />
              </Tooltip>
              <Tooltip text="右旋转" style={getZindexAdd}>
                <RotateRight
                  onClick={() => handleRotate('RotateRight')}
                  className={getIconCls()}
                />
              </Tooltip>
              <Tooltip text="下载" style={getZindexAdd}>
                <Download
                  onClick={handleDownloadImage}
                  className={getIconCls()}
                />
              </Tooltip>
              <Tooltip text="删除" style={getZindexAdd}>
                <Delate onClick={handleDel} className={getIconCls()} />
              </Tooltip>
            </div>
            <div
              className={`${getPrefixCls(
                rootPrefix,
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
              rootPrefix,
              `${imageGallery}-thumbnails-content`,
            )}`}
          >
            <ul
              className={`${getPrefixCls(
                rootPrefix,
                `${imageGallery}-t-c-ul`,
              )}`}
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
    ...configurations,
    beforeChange: (oldIndex: number, newIndex: number) => {
      beforeChange(newIndex);
      typeof configurations?.beforeChange === 'function' &&
        configurations.beforeChange(oldIndex, newIndex);
    },
    onInit: () => {
      typeof configurations?.onInit === 'function' && configurations.onInit();
    },
  };

  const wrapCls = classNames(getPrefixCls(rootPrefix), {
    [`${className}`]: className,
  });

  return (
    <>
      {itemsLength ? (
        <div className={wrapCls} style={getZindex}>
          {/* header */}
          <Header
            currentSlider={getCurrentSlider}
            showTitle={showTitle}
            style={getZindexAdd}
          >
            {/* close */}
            <Close
              className={getIconCls(
                getPrefixCls(rootPrefix, `${imageGallery}-close`),
              )}
              onClick={outBrowsing}
            />
          </Header>

          {/* loading */}
          <ClipLoader
            color={'#108ee9'}
            size={40}
            prefixCls={rootPrefix}
            loading={isDownloading}
            zIndex={getZindexAdd.zIndex}
          />

          {/* slider */}
          <div className={getPrefixCls(rootPrefix, `${wrapperCls}-container`)}>
            <SliderWrapper sliderWrapper={Slider} settings={settings}>
              {getGalleryRender}
            </SliderWrapper>
          </div>

          {/* sacle Progress Toast */}
          <Toast
            show={isShowToast}
            sacleProgress={controller.scale}
            style={getZindexAdd}
          />
        </div>
      ) : null}
    </>
  );
};

export default ImageGallery;
