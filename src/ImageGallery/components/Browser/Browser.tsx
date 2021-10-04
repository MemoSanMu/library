/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-30 10:20:19
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-04 12:13:30
 */
import React, { FC, useState, useEffect } from 'react';
import ImageGallery from '../ImageGallery';
import Portal from '../Portal';
import { ImageGalleryProps } from '../../interfaces';

interface BrowserProp extends ImageGalleryProps {
  destroyer?: () => void;
  isPortal?: boolean;
  browsing: boolean;
}

const Browser: FC<BrowserProp> = ({
  destroyer = () => {},
  browsing,
  isPortal = false,
  ...props
}) => {
  const [mounted, setMounted] = useState<boolean>(false);

  // 卸载
  const outBrowsing = () => {
    setMounted(false);
    destroyer && destroyer();
  };

  useEffect(() => {
    browsing === true && setMounted(browsing);
  }, [browsing]);

  return mounted ? (
    isPortal ? (
      <Portal>
        <ImageGallery {...props} outBrowsing={outBrowsing} />
      </Portal>
    ) : (
      <ImageGallery {...props} outBrowsing={outBrowsing} />
    )
  ) : null;
};

export default Browser;
