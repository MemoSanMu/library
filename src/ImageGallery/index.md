<!--
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-20 19:35:54
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-08 15:51:09
-->

## Foo

Demo:

```tsx
import React from 'react';
import { ImageGallery } from 'library';
const { ImageGalleryCard } = ImageGallery; // 卡片

const PREFIX_URL =
  'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/';

// const items = [...Array(3).keys()].map((item, i) => ({
//   src:
//     i === 2
//       ? 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png'
//       : `${PREFIX_URL}${1}.jpg`,
// }));

const items = [
  {
    src: `${PREFIX_URL}${1}.jpg`,
    alt: 'PREFIX_URL',
    title: 'PREFIX_URL_titlle',
  },
  {
    src: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  },
  {
    src: 'http://image.yonghuivip.com/images/comment/e1c964d9-54e2-42ed-ae2e-f516e8257067-13739d330d699218e03cd93d1232bf7ba025fed8.png',
  },
  {
    src: `${PREFIX_URL}${2}.jpg`,
  },
  {
    src: `${PREFIX_URL}${3}.jpg`,
    alt: 'PREFIX_URL',
  },
  {
    src: `${PREFIX_URL}${4}.jpg`,
  },
  {
    src: `${PREFIX_URL}${5}.jpg`,
  },
  {
    src: `${PREFIX_URL}${6}.jpg`,
  },
  {
    src: `${PREFIX_URL}${7}.jpg`,
  },
  {
    src: `${PREFIX_URL}${8}.jpg`,
  },
  {
    src: `${PREFIX_URL}${9}.jpg`,
  },
  {
    src: `${PREFIX_URL}${10}.jpg`,
  },
  {
    src: `${PREFIX_URL}${2}t.jpg`,
  },
  {
    src: `${PREFIX_URL}${3}t.jpg`,
  },
  // {
  //   src: `${PREFIX_URL}${4}t.jpg`,
  // },
  // {
  //   src: `${PREFIX_URL}${5}t.jpg`,
  // },
  // {
  //   src: `${PREFIX_URL}${6}t.jpg`,
  // },
  // {
  //   src: `${PREFIX_URL}${7}t.jpg`,
  // },
  // {
  //   src: `${PREFIX_URL}${8}t.jpg`,
  // },
  // {
  //   src: `${PREFIX_URL}${9}t.jpg`,
  // },
  // {
  //   src: `${PREFIX_URL}${10}t.jpg`,
  // },
];

export default () => (
  <div>
    1:卡片调用
    <ImageGalleryCard
      items={items}
      thumbnailsSlideMobileCount={3}
      configurations={{
        initialSlide: 2,
      }}
    />
    <div
      style={{
        margin: '30px 0',
      }}
    >
      2: img
    </div>
    <ImageGallery
      items={items}
      thumbnailsSlideMobileCount={3}
      src={`${PREFIX_URL}${1}.jpg`}
      forwardedRef={(ref) => {
        console.log(ref, 'ref');
      }}
      configurations={{
        initialSlide: 4,
        // fade: true,
        draggable: true,
      }}
    />
    <div
      style={{
        marginTop: '30px',
      }}
      onClick={() => {
        ImageGallery.browsing({
          items,
          thumbnailsSlideMobileCount: 3,
          configurations: {
            initialSlide: 3,
          },
        });
      }}
    >
      3:触发全屏画廊
    </div>
  </div>
);
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
