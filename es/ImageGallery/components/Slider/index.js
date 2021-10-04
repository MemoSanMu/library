import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';

/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-17 19:18:09
 * @LastEditors: wangsen
 * @LastEditTime: 2021-09-30 16:23:47
 */
import React from 'react';
import ReactSlick from 'react-slick';

var SliderWrapper = function SliderWrapper(props) {
  return /*#__PURE__*/ React.createElement(
    ReactSlick,
    _objectSpread(
      {
        ref: props.sliderWrapper,
      },
      props.settings
    ),
    props.children
  );
};

export default SliderWrapper;
