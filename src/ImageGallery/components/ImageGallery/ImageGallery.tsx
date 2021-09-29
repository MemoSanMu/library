import React, { FC, useRef, useState } from 'react';
import Message from '../Message';
import Toast from '../Toast';
import { isEqual } from 'lodash-es';
import classNames from 'classnames';
import SliderWrapper from '../Slider';
import ImageSlide from '../ImageSlide';
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
  getMaxXMobileRang,
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
} from '../../interfaces';

interface GalleryProps extends ImageGalleryProps {
  outBrowsing: () => void;
  destroyer: () => void;
}

const ImageGallery: FC<GalleryProps> = (props) => {
  const {
    thumbnailsSlideMobileCount = 1,
    prefixCls,
    items,
    initialSlide = 0,
    delCb,
    outBrowsing,
    destroyer,
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

  const [isShowToast, setIsShowToast] = useState<boolean>(false); // 缩放大小

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

  // 当图片切换前触发钩子
  const beforeChange = (_: number, newIndex: number) => {
    setCurrentIndex(newIndex); // 保存当前newIndex
    // 当控制旋转和缩放的值不同时 将恢复默认值
    !isEqual(defaultController, controller) && setController(defaultController);
  };

  // 初始化
  const onInit = () => {
    destroyer();
  };

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

  const settings = {
    dots: true,
    dotsClass: `slick-dots slick-thumb ${getPrefixCls(
      prefixCls,
      `${imageGallery}-thumbnails`,
    )}`,
    className: getPrefixCls(prefixCls, 'slick-slider'),
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    lazyLoad: true,
    slidesToScroll: 1,
    draggable: false,
    nextArrow: <RightOutlined />,
    prevArrow: <LeftOutlined />,
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
                <ZoomIn onClick={() => handleZoom('ZoomIn')} />
              </Tooltip>
              <Tooltip text="缩小">
                <ZoomOut onClick={() => handleZoom('ZoomOut')} />
              </Tooltip>
              <Tooltip text="左旋转">
                <RotateLeft onClick={() => handleRotate('RotateLeft')} />
              </Tooltip>
              <Tooltip text="右旋转">
                <RotateRight onClick={() => handleRotate('RotateRight')} />
              </Tooltip>
              <Tooltip text="下载">
                <Download onClick={handleDownloadImage} />
              </Tooltip>
              <Tooltip text="删除">
                <Delate onClick={handleDel} />
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
            {/* 待换 scroll 不使用transform */}
            <div>
              <ul
                className={`${getPrefixCls(
                  prefixCls,
                  `${imageGallery}-t-c-ul`,
                )}`}
                style={thumbnailsStyle}
              >
                {dots}
              </ul>
            </div>
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
          {imageGalleryItems &&
            imageGalleryItems.map((i: Items) => (
              <ImageSlide
                item={i}
                key={i.src}
                prefixCls={prefixCls}
                controller={controller}
              />
            ))}
        </SliderWrapper>
      </div>

      {/* sacle Progress Toast */}
      <Toast show={isShowToast} sacleProgress={controller.scale} />

      {/* close */}
      <Close
        className={getPrefixCls(prefixCls, `${imageGallery}-close`)}
        onClick={outBrowsing}
      />
    </div>
  );
};

export default ImageGallery;
