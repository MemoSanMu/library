/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-30 10:20:19
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-03 17:14:19
 */
import React, { FC, useState, useEffect } from 'react';
import ImageGallery from '../ImageGallery';
import { ImageGalleryProps } from '../../interfaces';

interface BrowserProp extends ImageGalleryProps {
  destroyer?: () => void;
  browsing: boolean;
}

const Browser: FC<BrowserProp> = ({
  destroyer = () => {},
  browsing,
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

  return mounted ? <ImageGallery {...props} outBrowsing={outBrowsing} /> : null;
};

export default Browser;
