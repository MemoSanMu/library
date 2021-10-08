import _extends from '@babel/runtime/helpers/esm/extends';

/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-30 11:53:54
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-08 15:27:44
 */
import React from 'react';
import Tooltip from '../Tooltip';
import { getPrefixCls, imageGallery } from '../../config/index';

var Header = function Header(_ref) {
  var props = _extends({}, _ref);

  var currentSlider = props.currentSlider,
    showTitle = props.showTitle,
    prefixCls = props.prefixCls,
    children = props.children,
    _props$style = props.style,
    style = _props$style === void 0 ? {} : _props$style;
  return /*#__PURE__*/ React.createElement(
    'header',
    {
      className: getPrefixCls(prefixCls, ''.concat(imageGallery, '-header')),
      style: style,
    },
    /*#__PURE__*/ React.createElement(
      'div',
      {
        className: getPrefixCls(
          prefixCls,
          ''.concat(imageGallery, '-header-alt')
        ),
      },
      showTitle &&
        /*#__PURE__*/ React.createElement(
          Tooltip,
          {
            text: currentSlider.alt || currentSlider.src,
            placement: 'bottom',
            style: style,
          },
          /*#__PURE__*/ React.createElement(
            'p',
            {
              className: getPrefixCls(
                prefixCls,
                ''.concat(imageGallery, '-header-title')
              ),
            },
            currentSlider.title || currentSlider.src
          )
        )
    ),
    children
  );
};

export default Header;
