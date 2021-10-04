/*
 * @Descripttion:
 * @version:
 * @Author: wangsen
 * @Date: 2021-09-24 15:40:12
 * @LastEditors: wangsen
 * @LastEditTime: 2021-10-01 22:47:23
 */

/**
 * @name: handleDownload
 * @msg: 下载
 * @param link 下载url
 * @return Promise
 */
export var handleDownload = function handleDownload(link) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');

    img.onload = function () {
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);
      canvas.toBlob(function (blob) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        var event = new MouseEvent('click');
        a.download = link;
        a.href = url;
        a.dispatchEvent(event);
        URL.revokeObjectURL(url);
        resolve(url);
      });
    };

    img.onerror = function (err) {
      reject(err);
    };

    img.src = link + '?v=' + Date.now();
  });
};
/**
 * @name: browserIeOrSafari
 * @msg: 判断是否是ie或者safari浏览器
 * @param {*}
 * @return 「isIE || isSafari」
 */

export var browserIeOrSafari = function browserIeOrSafari() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串

  var isOpera = userAgent.indexOf('Opera') > -1; //判断是否Opera浏览器

  var isIE =
    userAgent.indexOf('compatible') > -1 &&
    userAgent.indexOf('MSIE') > -1 &&
    !isOpera; //判断是否IE浏览器

  var isSafari =
    userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') == -1; //判断是否Safari浏览器
  // const isEdge = userAgent.indexOf('Windows NT 6.1; Trident/7.0;') > -1 && !isIE; //判断是否IE的Edge浏览器
  // const isFF = userAgent.indexOf('Firefox') > -1; //判断是否Firefox浏览器
  // const isChrome =
  //   userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1; //判断Chrome浏览器

  return isIE || isSafari;
};
