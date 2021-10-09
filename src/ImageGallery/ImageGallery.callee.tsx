/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-29 10:26:07
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-09 11:08:28
 */

/**
 * 命令式调用组件入口
 **/

import React from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import { ImageGalleryProps } from './interfaces';

// Components
import Browser from './components/Browser';

interface RENDER {
  CONTAINER: HTMLElement; // boby
  PORTAL: HTMLElement | null; // 入口
  CONTENT: HTMLElement | null; // 内容
}

// 弹窗对象
const RENDER: RENDER = {
  CONTAINER: document.body,
  PORTAL: null,
  CONTENT: null,
};

interface CalleeProps extends ImageGalleryProps {}

// 主动触发 调用函数
const callee = (props: CalleeProps) => {
  RENDER.PORTAL = document.createElement('figure'); // 入口
  RENDER.CONTENT = document.createElement('div'); // 内容

  RENDER.CONTAINER.appendChild(RENDER.PORTAL);
  RENDER.PORTAL.appendChild(RENDER.CONTENT);

  // DEL PORTAL
  const destroyer = () => {
    if (RENDER.PORTAL) {
      RENDER.CONTAINER.removeChild(RENDER.PORTAL);
      RENDER.PORTAL = null;
    }
    RENDER.CONTENT && (RENDER.CONTENT = null);
  };

  // Mount content
  ReactDOM.render(
    <Browser destroyer={destroyer} browsing={true} {...props} />,
    RENDER.CONTENT,
  );
  // 创建画廊到body
  createPortal(RENDER.CONTENT, RENDER.PORTAL);
};

export default callee;
