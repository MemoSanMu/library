export interface CommonProps {
  color?: string;
  loading?: boolean;
  css?: string;
  speedMultiplier?: number;
  prefixCls?: string;
}
export declare type LengthType = number | string;
export interface LoaderSizeProps extends CommonProps {
  size?: LengthType;
}
