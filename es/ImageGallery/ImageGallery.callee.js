import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';

/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-29 10:26:07
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-05 10:40:58
 */

/**
 * 命令式调用组件入口
 **/
import React from 'react';
import ReactDOM, { createPortal } from 'react-dom'; // Components

import Browser from '@/ImageGallery/components/Browser'; // 弹窗对象

var RENDER = {
  CONTAINER: document.body,
  PORTAL: null,
  CONTENT: null,
}; // 主动触发 调用函数

var callee = function callee(props) {
  RENDER.PORTAL = document.createElement('figure'); // 入口

  RENDER.CONTENT = document.createElement('div'); // 内容

  RENDER.CONTAINER.appendChild(RENDER.PORTAL);
  RENDER.PORTAL.appendChild(RENDER.CONTENT); // DEL PORTAL

  var destroyer = function destroyer() {
    if (RENDER.PORTAL) {
      RENDER.CONTAINER.removeChild(RENDER.PORTAL);
      RENDER.PORTAL = null;
    }

    RENDER.CONTENT && (RENDER.CONTENT = null);
  }; // Mount content

  ReactDOM.render(
    /*#__PURE__*/ React.createElement(
      Browser,
      _objectSpread(
        {
          destroyer: destroyer,
          browsing: true,
        },
        props
      )
    ),
    RENDER.CONTENT
  ); // 创建画廊到body

  /*#__PURE__*/
  createPortal(RENDER.CONTENT, RENDER.PORTAL);
};

export default callee;
