import { ImageGalleryProps } from './interfaces';
export interface CalleeProps extends ImageGalleryProps {}
declare const callee: (props: CalleeProps) => void;
export default callee;
