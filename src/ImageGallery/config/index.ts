const rootPrefix = 'lib';

export const wrapperCls = 'image-gallery';

/**
 * @name: getPrefixCls 拼接前缀
 * @param {prefixCls} 前缀
 * @return {name} 类名
 */
export const getPrefixCls = (
  prefixCls: string = rootPrefix,
  name: string = wrapperCls,
) => {
  return `${prefixCls}-${name}`;
};

// 索引缩略图最大展示长度
export const thumbnailsMaxLength = 9;

// 单个缩略图 的宽度 width+margin+border
export const thumbnailsSlideWidth = 108;

// 根据传入的 缩略图 可滚动条数 算出最大可滚动范围
export const getMaxXMobileRang = (itemLength: number) =>
  (itemLength - thumbnailsMaxLength) * thumbnailsSlideWidth;
