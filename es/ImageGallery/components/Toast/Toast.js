/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-27 16:13:57
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-08 14:32:01
 */
import React, { useCallback } from 'react';
import classNames from 'classnames';
import { getPrefixCls, imageGallery } from '../../config/index';

var Toast = function Toast(props) {
  var prefixCls = props.prefixCls,
    show = props.show,
    sacleProgress = props.sacleProgress,
    _props$style = props.style,
    style = _props$style === void 0 ? {} : _props$style;
  var toastContent = useCallback(
    function () {
      return /*#__PURE__*/ React.createElement(
        'div',
        {
          className: getPrefixCls(prefixCls, 'toast-content'),
        },
        /*#__PURE__*/ React.createElement(
          'span',
          null,
          ''.concat(sacleProgress * 100, '%')
        )
      );
    },
    [sacleProgress]
  );
  var messageCls = classNames(
    getPrefixCls(prefixCls, ''.concat(imageGallery, '-toast')),
    {
      show: show,
    }
  );
  return /*#__PURE__*/ React.createElement(
    'div',
    {
      className: messageCls,
      style: style,
    },
    toastContent()
  );
};

export default Toast;
