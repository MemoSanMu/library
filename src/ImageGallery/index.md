## Foo

Demo:

```tsx
import React from 'react';
import { ImageGallery } from 'library';
const PREFIX_URL =
  'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/';

const items = [...Array(12).keys()].map((item, i) => ({
  src: `${PREFIX_URL}${i + 1}.jpg`,
}));

export default () => <ImageGallery items={items} thumbnailsSlideToCount={2} />;
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
