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
