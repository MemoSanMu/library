import _extends from '@babel/runtime/helpers/esm/extends';

/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-30 11:53:54
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-05 10:35:14
 */
import React from 'react';
import Tooltip from '@/ImageGallery/components/Tooltip';
import { getPrefixCls, imageGallery } from '@/ImageGallery/config';

var Header = function Header(_ref) {
  var props = _extends({}, _ref);

  var currentSlider = props.currentSlider,
    showTitle = props.showTitle,
    prefixCls = props.prefixCls,
    children = props.children;
  return /*#__PURE__*/ React.createElement(
    'header',
    {
      className: getPrefixCls(prefixCls, ''.concat(imageGallery, '-header')),
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
          },
          /*#__PURE__*/ React.createElement(
            'p',
            {
              className: getPrefixCls(
                prefixCls,
                ''.concat(imageGallery, '-header-title')
              ),
            },
            currentSlider.alt || currentSlider.src
          )
        )
    ),
    children
  );
};

export default Header;
