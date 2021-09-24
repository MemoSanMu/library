/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-24 16:40:49
 * @LastEditors: wangsen
 * @LastEditTime: 2021-09-24 17:42:44
 */
export interface CommonProps {
  color?: string;
  loading?: boolean;
  css?: string;
  speedMultiplier?: number;
  prefixCls?: string;
}

export type LengthType = number | string;

export interface LoaderSizeProps extends CommonProps {
  size?: LengthType;
}
