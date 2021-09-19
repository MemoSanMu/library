## Foo

Demo:

```tsx
import React from 'react';
import { ImageGallery } from 'library';
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
  },
  {
    src: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  },
  {
    src: 'http://image.yonghuivip.com/images/comment/e1c964d9-54e2-42ed-ae2e-f516e8257067-13739d330d699218e03cd93d1232bf7ba025fed8.png',
  },
];

export default () => (
  <ImageGallery items={items} thumbnailsSlideMobileCount={3} />
);
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
