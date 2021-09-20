import React, { FC } from 'react';

interface Props {
  width: string;
  height: string;
  id: string;
  children: React.ReactNode;
}

const Svg: FC<Props> = (props) => {
  const { children, width, height, id } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>{id}</title>
      <g id={id} stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        {children}
      </g>
    </svg>
  );
};

export default Svg;
