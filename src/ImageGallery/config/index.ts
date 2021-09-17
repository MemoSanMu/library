const rootPrefix = 'lib';
export const wrapperCls = 'image-gallery';

export const getPrefixCls = (prefixCls: string = rootPrefix) => {
  return `${prefixCls}-${wrapperCls}`;
};
