/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-24 16:40:49
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-08 14:28:14
 */
export interface CommonProps {
  color?: string;
  loading?: boolean;
  css?: string;
  speedMultiplier?: number;
  prefixCls?: string;
  zIndex?: number;
}

export type LengthType = number | string;

export interface LoaderSizeProps extends CommonProps {
  size?: LengthType;
}
