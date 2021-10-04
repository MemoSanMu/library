import { ThumbnailsControl as Thumbnails } from '../../interfaces';
export declare const RightOutlined: (props: any) => JSX.Element;
export declare const LeftOutlined: (props: any) => JSX.Element;
interface ThumbnailsSlick {
  onClick?: () => void;
  className?: string;
}
interface ThumbnailsControl extends ThumbnailsSlick {
  thumbnailsControl: Thumbnails;
}
export declare const CareLeftFilled: ({
  onClick,
  className,
  thumbnailsControl,
}: ThumbnailsControl) => JSX.Element;
export declare const CareRightFilled: ({
  onClick,
  className,
  thumbnailsControl,
}: ThumbnailsControl) => JSX.Element;
export declare const ZoomIn: ({
  onClick,
  className,
}: ThumbnailsSlick) => JSX.Element;
export declare const ZoomOut: ({
  onClick,
  className,
}: ThumbnailsSlick) => JSX.Element;
export declare const RotateLeft: ({
  onClick,
  className,
}: ThumbnailsSlick) => JSX.Element;
export declare const RotateRight: ({
  onClick,
  className,
}: ThumbnailsSlick) => JSX.Element;
export declare const Download: ({
  onClick,
  className,
}: ThumbnailsSlick) => JSX.Element;
export declare const Delate: ({
  onClick,
  className,
}: ThumbnailsSlick) => JSX.Element;
export declare const Warning: () => JSX.Element;
export declare const Close: ({
  onClick,
  className,
}: ThumbnailsSlick) => JSX.Element;
export {};
