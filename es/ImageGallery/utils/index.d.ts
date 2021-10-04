/**
 * @name: handleDownload
 * @msg: 下载
 * @param link 下载url
 * @return Promise
 */
export declare const handleDownload: (link: string) => Promise<unknown>;
/**
 * @name: browserIeOrSafari
 * @msg: 判断是否是ie或者safari浏览器
 * @param {*}
 * @return 「isIE || isSafari」
 */
export declare const browserIeOrSafari: () => boolean;
