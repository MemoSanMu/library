import React, { FC, useState, useEffect } from 'react';
import Portal from '../Portal';
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

  useEffect(() => {
    browsing === true && setMounted(browsing);
    return () => setMounted(false);
  }, []);

  const outBrowsing = () => {
    setMounted(false);
    destroyer && destroyer();
  };

  return mounted ? (
    <Portal>
      <ImageGallery
        {...props}
        outBrowsing={outBrowsing}
        destroyer={destroyer}
      />
    </Portal>
  ) : null;
};

export default Browser;
