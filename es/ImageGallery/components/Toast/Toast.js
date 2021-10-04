/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-27 16:13:57
 * @LastEditors: wangsen
 * @LastEditTime: 2021-09-28 19:50:49
 */
import React, { useCallback } from 'react';
import classNames from 'classnames';
import { getPrefixCls, imageGallery } from '../../config/index';

var Toast = function Toast(props) {
  var prefixCls = props.prefixCls,
    show = props.show,
    sacleProgress = props.sacleProgress;
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
    },
    toastContent()
  );
};

export default Toast;
