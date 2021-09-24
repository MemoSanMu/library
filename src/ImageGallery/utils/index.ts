/**
 * @name: handleDownload
 * @msg: 下载
 * @param link 下载url
 * @return Promise
 */
export const handleDownload = (link: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d') as CanvasRenderingContext2D;
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const event = new MouseEvent('click');
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
