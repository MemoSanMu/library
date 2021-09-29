/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-29 10:26:07
 * @LastEditors: wangsen
 * @LastEditTime: 2021-09-29 15:02:10
 */

/**
 * 命令式调用组件入口
 **/

import React from 'react';
import ReactDOM from 'react-dom';
import { ImageGalleryProps } from './interfaces';

// Components
import Browser from './components/Browser';

interface RENDER {
  CONTAINER: HTMLElement;
  PORTAL: HTMLElement | null;
}

// 弹窗对象
const RENDER: RENDER = {
  CONTAINER: document.body,
  PORTAL: null,
};

interface CalleeProps extends ImageGalleryProps {
  coverRef?: null; //   后续在看是否需要传入ref
}

// 主动触发 调用函数
const callee = (props: CalleeProps) => {
  RENDER.PORTAL = document.createElement('div');
  RENDER.CONTAINER.appendChild(RENDER.PORTAL);

  // DEL PORTAL
  const destroyer = () => {
    RENDER.PORTAL && RENDER.CONTAINER.removeChild(RENDER.PORTAL);
    RENDER.PORTAL = null;
  };

  // Mount target
  ReactDOM.render(
    <Browser destroyer={destroyer} browsing={true} {...props} />,
    RENDER.PORTAL,
  );
};

export default callee;
