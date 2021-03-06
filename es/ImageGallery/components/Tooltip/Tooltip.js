/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-26 16:21:32
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-08 13:55:53
 */
import React from 'react';
import RcTooltip from 'rc-tooltip';
import { getPrefixCls, imageGallery } from '../../config/index';

var Tooltip = function Tooltip(props) {
  var children = props.children,
    prefixCls = props.prefixCls,
    text = props.text,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'top' : _props$placement,
    _props$style = props.style,
    style = _props$style === void 0 ? {} : _props$style;
  return /*#__PURE__*/ React.createElement(
    RcTooltip,
    {
      placement: placement,
      overlayClassName: ''.concat(
        getPrefixCls(prefixCls, ''.concat(imageGallery, '-rc-tooltip'))
      ),
      overlay: /*#__PURE__*/ React.createElement('span', null, text),
      overlayStyle: style,
    },
    /*#__PURE__*/ React.createElement('div', null, children)
  );
};

export default Tooltip;
