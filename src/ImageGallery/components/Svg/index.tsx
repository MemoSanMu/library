import React from 'react';
import Svg from './Svg';

export const RightOutlined = (props: any) => {
  const { className, style, onClick } = props;
  const ops = {
    id: 'Icon_RightOutlined',
    width: '40px',
    height: '46px',
  };
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <Svg {...ops}>
        <path
          d="M12.8747851,5.12040486 C13.067173,5.29363172 13.0827061,5.59002105 12.9094792,5.78240897 L8.44143808,10.7473963 C8.41629464,10.795476 8.38231488,10.8399738 8.33962881,10.8784085 C8.25358866,10.9558794 8.14674742,10.9955969 8.03942443,10.9986258 C8.031524,10.998064 8.0234933,10.9984689 8.01545645,10.9986683 C8.0070566,10.9985021 7.99869237,10.9980893 7.99034407,10.9974541 C7.88313666,10.9955969 7.77629543,10.9558794 7.69025528,10.8784085 C7.64756921,10.8399738 7.61358944,10.795476 7.588446,10.7473963 L3.12040486,5.78240897 C2.947178,5.59002105 2.96271111,5.29363172 3.15509903,5.12040486 C3.34748694,4.947178 3.64387628,4.96271111 3.81710313,5.15509903 L3.81710313,5.15509903 L8.015,9.817 L12.2127809,5.15509903 C12.3860078,4.96271111 12.6823971,4.947178 12.8747851,5.12040486 Z"
          id="图标颜色"
          fill="#FEFEFE"
          transform="translate(8.014942, 7.999407) scale(1, -1) rotate(-90.000000) translate(-8.014942, -7.999407) "
        ></path>
      </Svg>
    </div>
  );
};

export const LeftOutlined = (props: any) => {
  const { className, style, onClick } = props;
  const ops = {
    id: 'Icon_LeftOutlined',
    width: '40px',
    height: '46px',
  };
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <Svg {...ops}>
        <path
          d="M12.8747851,5.12040486 C13.067173,5.29363172 13.0827061,5.59002105 12.9094792,5.78240897 L8.44143808,10.7473963 C8.41629464,10.795476 8.38231488,10.8399738 8.33962881,10.8784085 C8.25358866,10.9558794 8.14674742,10.9955969 8.03942443,10.9986258 C8.031524,10.998064 8.0234933,10.9984689 8.01545645,10.9986683 C8.0070566,10.9985021 7.99869237,10.9980893 7.99034407,10.9974541 C7.88313666,10.9955969 7.77629543,10.9558794 7.69025528,10.8784085 C7.64756921,10.8399738 7.61358944,10.795476 7.588446,10.7473963 L3.12040486,5.78240897 C2.947178,5.59002105 2.96271111,5.29363172 3.15509903,5.12040486 C3.34748694,4.947178 3.64387628,4.96271111 3.81710313,5.15509903 L3.81710313,5.15509903 L8.015,9.817 L12.2127809,5.15509903 C12.3860078,4.96271111 12.6823971,4.947178 12.8747851,5.12040486 Z"
          id="图标颜色"
          fill="#FEFEFE"
          transform="translate(8.014942, 7.999407) rotate(90.000000) translate(-8.014942, -7.999407) "
        ></path>
      </Svg>
    </div>
  );
};

interface ThumbnailsSlick {
  onClick?: () => void;
  className?: string;
}

export const CareLeftFilled = ({ onClick }: ThumbnailsSlick) => {
  const ops = {
    id: 'Icon_CareLeftFilled',
    width: '30px',
    height: '40px',
  };
  return (
    <div className="icon l" onClick={onClick}>
      <div>
        <Svg {...ops}>
          <path
            d="M5.08117034,9.74379161 L8.09733015,6.10544582 C8.22315859,5.96485139 8.4435445,5.96485139 8.56937294,6.10544582 L11.5706418,9.74379161 C11.7523113,9.94761634 11.6078692,10.2704628 11.3346204,10.2704628 L5.31644718,10.2704628 C5.04394299,10.2704628 4.89875633,9.94761634 5.08117034,9.74379161 Z"
            id="图标颜色"
            fill="#FEFEFE"
            transform="translate(8.325731, 8.135231) scale(-1, 1) rotate(90.000000) translate(-8.325731, -8.135231) "
          ></path>
        </Svg>
      </div>
    </div>
  );
};

export const CareRightFilled = ({ onClick }: ThumbnailsSlick) => {
  const ops = {
    id: 'Icon_CareRightFilled',
    width: '30px',
    height: '40px',
  };
  return (
    <div className="icon r" onClick={onClick}>
      <div>
        <Svg {...ops}>
          <path
            d="M5.08117034,9.74379161 L8.09733015,6.10544582 C8.22315859,5.96485139 8.4435445,5.96485139 8.56937294,6.10544582 L11.5706418,9.74379161 C11.7523113,9.94761634 11.6078692,10.2704628 11.3346204,10.2704628 L5.31644718,10.2704628 C5.04394299,10.2704628 4.89875633,9.94761634 5.08117034,9.74379161 Z"
            id="图标颜色"
            fill="#FEFEFE"
            transform="translate(8.325731, 8.135231) rotate(90.000000) translate(-8.325731, -8.135231) "
          ></path>
        </Svg>
      </div>
    </div>
  );
};

// 放大
export const ZoomIn = ({ onClick }: ThumbnailsSlick) => {
  const ops = {
    id: 'Icon_ZoomIn',
    width: '24px',
    height: '24px',
  };
  return (
    <div onClick={onClick}>
      <Svg {...ops}>
        <path
          d="M7.08841568,0 C11.0032788,0 14.1768314,3.17363077 14.1768314,7.08841568 C14.1768314,8.61535183 13.694012,10.0293965 12.8727686,11.1865299 C12.902165,11.2094656 12.9301385,11.234169 12.9565338,11.260503 L12.9565338,11.260503 L15.7308602,14.0346729 C16.0897133,14.3935886 16.0897133,14.9754558 15.7308602,15.3343089 C15.3719446,15.6931306 14.7901555,15.6931306 14.4312399,15.3343089 L14.4312399,15.3343089 L11.6570856,12.5600451 C11.6476376,12.5505188 11.6384555,12.5408987 11.6294454,12.531044 C10.3995434,13.5583295 8.81626324,14.176847 7.08841568,14.176847 C3.17364641,14.176847 0,11.0032162 0,7.08843132 C0,3.17364641 3.17355256,0 7.08841568,0 Z M7.08841568,1.95524162 C4.2534436,1.95524162 1.95521034,4.25349052 1.95521034,7.08843132 C1.95521034,9.92346597 4.2534436,12.2216992 7.08841568,12.2216992 C9.92345033,12.2216992 12.2216054,9.92346597 12.2216054,7.08843132 C12.2216054,4.25347488 9.92345033,1.95524162 7.08841568,1.95524162 Z M7.95240985,3.31353669 L7.95240985,6.33581127 L10.9747001,6.33581127 L10.9747001,7.95838526 L7.95240985,7.95838526 L7.95240985,10.9806911 L6.32985151,10.9806911 L6.32985151,7.9584009 L3.30756128,7.9584009 L3.30756128,6.33582692 L6.32983586,6.33582692 L6.32983586,3.31353669 L7.95240985,3.31353669 Z"
          id="Combined-Shape"
          fill="#FFFFFF"
          fillRule="nonzero"
        ></path>
      </Svg>
    </div>
  );
};

// 缩小
export const ZoomOut = ({ onClick }: ThumbnailsSlick) => {
  const ops = {
    id: 'Icon_ZoomOut',
    width: '24px',
    height: '24px',
  };
  return (
    <div onClick={onClick}>
      <Svg {...ops}>
        <path
          d="M7.08841568,0 C11.0032788,0 14.1768314,3.17363077 14.1768314,7.08841568 C14.1768314,8.61535183 13.694012,10.0293965 12.8727686,11.1865299 C12.902165,11.2094656 12.9301385,11.234169 12.9565338,11.260503 L12.9565338,11.260503 L15.7308602,14.0346729 C16.0897133,14.3935886 16.0897133,14.9754558 15.7308602,15.3343089 C15.3719446,15.6931306 14.7901555,15.6931306 14.4312399,15.3343089 L14.4312399,15.3343089 L11.6570856,12.5600451 C11.6476376,12.5505188 11.6384555,12.5408987 11.6294454,12.531044 C10.3995434,13.5583295 8.81626324,14.176847 7.08841568,14.176847 C3.17364641,14.176847 0,11.0032162 0,7.08843132 C0,3.17364641 3.17355256,0 7.08841568,0 Z M7.08841568,1.95524162 C4.2534436,1.95524162 1.95521034,4.25349052 1.95521034,7.08843132 C1.95521034,9.92346597 4.2534436,12.2216992 7.08841568,12.2216992 C9.92345033,12.2216992 12.2216054,9.92346597 12.2216054,7.08843132 C12.2216054,4.25347488 9.92345033,1.95524162 7.08841568,1.95524162 Z M10.9747001,6.33581127 L10.9747001,7.9584009 L3.30756128,7.9584009 L3.30756128,6.33581127 L10.9747001,6.33581127 Z"
          id="Combined-Shape"
          fill="#FFFFFF"
          fillRule="nonzero"
        ></path>
      </Svg>
    </div>
  );
};

// 左旋转
export const RotateLeft = ({ onClick }: ThumbnailsSlick) => {
  const ops = {
    id: 'Icon_RotateLeft',
    width: '24px',
    height: '24px',
  };
  return (
    <div onClick={onClick}>
      <Svg {...ops}>
        <path
          d="M3.85561628,3.86593304 L9.67813821,3.86593304 C11.0191077,3.86593304 11.5051951,4.00540589 11.9950418,4.26781036 C12.4793946,4.52420682 12.8754807,4.92029297 13.1318772,5.40464574 C13.3946576,5.89449247 13.5337545,6.38057981 13.5337545,7.72154932 L13.5337545,12.0403208 C13.5337545,13.3812903 13.3942816,13.8673776 13.1318772,14.3572243 C12.8754807,14.8415771 12.4793946,15.2376633 11.9950418,15.4940597 C11.5051951,15.7568401 11.0191077,15.895937 9.67813821,15.895937 L3.85561628,15.895937 C2.51464677,15.895937 2.02855942,15.7564642 1.5387127,15.4940597 C1.05435994,15.2376633 0.65827378,14.8415771 0.401877319,14.3572243 C0.139096923,13.8673776 0,13.3812903 0,12.0403208 L0,7.72154932 C0,6.38057981 0.139472853,5.89449245 0.401877319,5.40464574 C0.658273778,4.92029297 1.05435994,4.52420681 1.5387127,4.26781036 C2.02855942,4.00502996 2.51464677,3.86593304 3.85561628,3.86593304 Z M3.43155864,5.36968354 C2.76126186,5.36968354 2.51803022,5.43960793 2.27291888,5.57043423 C2.0307425,5.69863246 1.83269942,5.89667554 1.7045012,6.13885192 C1.57367489,6.38396325 1.5037505,6.6271949 1.5037505,7.29749168 L1.5037505,12.4643784 C1.5037505,13.1346752 1.57367489,13.3779068 1.7045012,13.6230181 C1.83570343,13.8681295 2.02780756,14.0602336 2.27291888,14.1914358 C2.51803022,14.3222621 2.76126186,14.3921865 3.43155864,14.3921865 L10.1021959,14.3921865 C10.7724926,14.3921865 11.0157243,14.3222622 11.2608356,14.1914358 C11.503012,14.0632376 11.7010551,13.8651945 11.8292533,13.6230181 C11.9600796,13.3779068 12.030004,13.1346752 12.030004,12.4643784 L12.030004,7.29749168 C12.030004,6.6271949 11.9600796,6.38396325 11.8292533,6.13885192 C11.7010551,5.89667553 11.503012,5.69863246 11.2608356,5.57043423 C11.0157243,5.43960794 10.7724926,5.36968354 10.1021959,5.36968354 L3.43155864,5.36968354 L3.43155864,5.36968354 Z M9.77513013,2.73812016 C9.43470054,2.73844588 9.13652827,2.50999592 9.04825306,2.18121043 C8.95997785,1.85242493 9.1036283,1.50535054 9.39844062,1.33512095 L11.3518125,0.207308076 C11.5845709,0.0708544051 11.8725986,0.0695769873 12.1065581,0.20396074 C12.3405176,0.338344492 12.484536,0.587784419 12.4839429,0.857591194 C12.4833497,1.12739797 12.3382359,1.37620225 12.1036878,1.50955601 L11.9570721,1.59414197 C13.7227454,2.19817949 15.1618398,3.50252874 15.9359959,5.2005116 C16.0444509,5.44629813 16.0135419,5.73127429 15.854912,5.94809232 C15.6962821,6.16491035 15.434031,6.28063044 15.1669462,6.25166195 C14.8998613,6.22269346 14.6685192,6.05343739 14.5600642,5.80765086 C13.7281142,3.99600745 11.8984258,2.73849611 9.77513013,2.73812016 Z"
          id="Shape"
          fill="#FFFFFF"
          fillRule="nonzero"
        ></path>
      </Svg>
    </div>
  );
};

// 右旋转
export const RotateRight = ({ onClick }: ThumbnailsSlick) => {
  const ops = {
    id: 'Icon_RotateRight',
    width: '24px',
    height: '24px',
  };
  return (
    <div onClick={onClick}>
      <Svg {...ops}>
        <path
          d="M3.85561628,3.86593304 L9.67813821,3.86593304 C11.0191077,3.86593304 11.5051951,4.00540589 11.9950418,4.26781036 C12.4793946,4.52420682 12.8754807,4.92029297 13.1318772,5.40464574 C13.3946576,5.89449247 13.5337545,6.38057981 13.5337545,7.72154932 L13.5337545,12.0403208 C13.5337545,13.3812903 13.3942816,13.8673776 13.1318772,14.3572243 C12.8754807,14.8415771 12.4793946,15.2376633 11.9950418,15.4940597 C11.5051951,15.7568401 11.0191077,15.895937 9.67813821,15.895937 L3.85561628,15.895937 C2.51464677,15.895937 2.02855942,15.7564642 1.5387127,15.4940597 C1.05435994,15.2376633 0.65827378,14.8415771 0.401877319,14.3572243 C0.139096923,13.8673776 1.07469589e-13,13.3812903 1.07469589e-13,12.0403208 L1.07469589e-13,7.72154932 C1.07469589e-13,6.38057981 0.139472853,5.89449245 0.401877319,5.40464574 C0.658273778,4.92029297 1.05435994,4.52420681 1.5387127,4.26781036 C2.02855942,4.00502996 2.51464677,3.86593304 3.85561628,3.86593304 Z M3.43155864,5.36968354 C2.76126186,5.36968354 2.51803022,5.43960793 2.27291888,5.57043423 C2.0307425,5.69863246 1.83269942,5.89667554 1.7045012,6.13885192 C1.57367489,6.38396325 1.5037505,6.6271949 1.5037505,7.29749168 L1.5037505,12.4643784 C1.5037505,13.1346752 1.57367489,13.3779068 1.7045012,13.6230181 C1.83570343,13.8681295 2.02780756,14.0602336 2.27291888,14.1914358 C2.51803022,14.3222621 2.76126186,14.3921865 3.43155864,14.3921865 L10.1021959,14.3921865 C10.7724926,14.3921865 11.0157243,14.3222622 11.2608356,14.1914358 C11.503012,14.0632376 11.7010551,13.8651945 11.8292533,13.6230181 C11.9600796,13.3779068 12.030004,13.1346752 12.030004,12.4643784 L12.030004,7.29749168 C12.030004,6.6271949 11.9600796,6.38396325 11.8292533,6.13885192 C11.7010551,5.89667553 11.503012,5.69863246 11.2608356,5.57043423 C11.0157243,5.43960794 10.7724926,5.36968354 10.1021959,5.36968354 L3.43155864,5.36968354 L3.43155864,5.36968354 Z M9.77513013,2.73812016 C9.43470054,2.73844588 9.13652827,2.50999592 9.04825306,2.18121043 C8.95997785,1.85242493 9.1036283,1.50535054 9.39844062,1.33512095 L11.3518125,0.207308076 C11.5845709,0.0708544051 11.8725986,0.0695769873 12.1065581,0.20396074 C12.3405176,0.338344492 12.484536,0.587784419 12.4839429,0.857591194 C12.4833497,1.12739797 12.3382359,1.37620225 12.1036878,1.50955601 L11.9570721,1.59414197 C13.7227454,2.19817949 15.1618398,3.50252874 15.9359959,5.2005116 C16.0444509,5.44629813 16.0135419,5.73127429 15.854912,5.94809232 C15.6962821,6.16491035 15.434031,6.28063044 15.1669462,6.25166195 C14.8998613,6.22269346 14.6685192,6.05343739 14.5600642,5.80765086 C13.7281142,3.99600745 11.8984258,2.73849611 9.77513013,2.73812016 Z"
          id="Shape"
          fill="#FFFFFF"
          fillRule="nonzero"
          transform="translate(8.000000, 8.000000) scale(-1, 1) translate(-8.000000, -8.000000) "
        ></path>
      </Svg>
    </div>
  );
};

// 下载
export const Download = ({ onClick }: ThumbnailsSlick) => {
  const ops = {
    id: 'Icon_Download',
    width: '24px',
    height: '24px',
  };
  return (
    <div onClick={onClick}>
      <Svg {...ops}>
        <path
          d="M10.8235241,5.64706625 L10.8235241,0.666666667 C10.8235241,0.298476833 10.5250473,2.65431532e-16 10.1568574,0 L5.84310651,0 C5.47491667,6.76353751e-17 5.17643984,0.298476833 5.17643984,0.666666667 L5.17643984,5.64706625 L5.17643984,5.64706625 L3.02122564,5.64706625 C2.6530358,5.64706625 2.35455897,5.94554308 2.35455897,6.31373291 C2.35455897,6.49054359 2.42479661,6.66011259 2.54982047,6.78513679 L7.5285781,11.763908 C7.78892727,12.0242579 8.21103726,12.0242585 8.47138714,11.7639093 L13.450172,6.78513808 C13.7105219,6.52478891 13.7105225,6.10267892 13.4501733,5.84232904 C13.325149,5.71730439 13.1555794,5.64706625 12.9787681,5.64706625 L10.8235241,5.64706625 L10.8235241,5.64706625 Z M1.41175304,15.0588283 C1.41175304,15.5786231 1.83312996,16 2.35292474,16 L13.6470753,16 C14.16687,16 14.588247,15.5786231 14.588247,15.0588283 C14.588247,14.5390335 14.16687,14.1176566 13.6470753,14.1176566 L2.35292474,14.1176566 C1.83312996,14.1176566 1.41175304,14.5390335 1.41175304,15.0588283 Z"
          id="Shape"
          fill="#FFFFFF"
          fillRule="nonzero"
        ></path>
      </Svg>
    </div>
  );
};

// 删除
export const Delate = ({ onClick }: ThumbnailsSlick) => {
  const ops = {
    id: 'Icon_Delate',
    width: '24px',
    height: '24px',
  };
  return (
    <div onClick={onClick}>
      <Svg {...ops}>
        <path
          d="M14.4,4 L1.60000001,4 C1.15817221,4 0.800000008,3.6418278 0.800000008,3.2 C0.800000008,2.7581722 1.15817221,2.4 1.60000001,2.4 L14.4,2.4 C14.8418278,2.4 15.2,2.75817221 15.2,3.2 C15.2,3.64182779 14.8418278,4 14.4,4 Z M9.60000001,1.6 L6.40000001,1.6 C5.95817221,1.6 5.60000001,1.2418278 5.60000001,0.8 C5.60000001,0.3581722 5.95817221,0 6.40000001,0 L9.60000001,0 C10.0418278,0 10.4,0.3581722 10.4,0.8 C10.4,1.2418278 10.0418278,1.6 9.60000001,1.6 Z M5.60000001,12 L5.60000001,6.4 C5.60000001,5.9581722 5.95817221,5.6 6.40000001,5.6 C6.84182781,5.6 7.20000001,5.9581722 7.20000001,6.4 L7.20000001,12 C7.20000001,12.4418278 6.8418278,12.8 6.40000001,12.8 C5.95817222,12.8 5.60000001,12.4418278 5.60000001,12 L5.60000001,12 Z M8.80000001,12 L8.80000001,6.4 C8.80000001,5.9581722 9.15817221,5.6 9.60000001,5.6 C10.0418278,5.6 10.4,5.9581722 10.4,6.4 L10.4,12 C10.4,12.4418278 10.0418278,12.8 9.60000001,12.8 C9.15817221,12.8 8.80000001,12.4418278 8.80000001,12 Z M3.20000001,4.8 C3.64182781,4.8 4.00000001,5.1581722 4.00000001,5.6 L4.00000001,13.6 C4.00000001,14.0418278 4.35817221,14.4 4.80000001,14.4 L11.2,14.4 C11.6418278,14.4 12,14.0418278 12,13.6 L12,5.6 C12,5.15817221 12.3581722,4.8 12.8,4.8 C13.2418278,4.8 13.6,5.15817221 13.6,5.6 L13.6,13.6 C13.6,14.2365196 13.3471436,14.846969 12.8970563,15.2970563 C12.446969,15.7471436 11.8365196,16 11.2,16 L4.80000001,16 C3.47451661,16 2.40000001,14.9254834 2.40000001,13.6 L2.40000001,5.6 C2.40000001,5.1581722 2.75817221,4.8 3.20000001,4.8 Z"
          id="Shape"
          fill="#FFFFFF"
          fillRule="nonzero"
        ></path>
      </Svg>
    </div>
  );
};

// warning
export const Warning = () => {
  return (
    <svg
      width="14px"
      height="14px"
      viewBox="0 0 14 14"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>Icons / S / Warning</title>
      <g
        id="多图预览"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          transform="translate(-623.000000, -1588.000000)"
          fill="#FBAA33"
          id="Message-全局提示-/-Warning-警告"
        >
          <g transform="translate(606.000000, 1575.000000)">
            <g
              id="Icons-/-S-/-Warning"
              transform="translate(16.000000, 12.000000)"
            >
              <path
                d="M1,8 C1,4.13359375 4.13359375,1 8,1 C11.8664062,1 15,4.13359375 15,8 C15,11.8664062 11.8664062,15 8,15 C4.13359375,15 1,11.8664062 1,8 Z M8.4375,4.0625 C8.4375,3.82050781 8.24199219,3.625 8,3.625 L8,3.625 C7.75800781,3.625 7.5625,3.82050781 7.5625,4.0625 L7.5625,4.0625 C7.5625,4.30449219 7.75800781,4.5 8,4.5 L8,4.5 C8.24199219,4.5 8.4375,4.30449219 8.4375,4.0625 L8.4375,4.0625 L8.4375,4.0625 Z M8.4375,5.8125 C8.4375,5.57050781 8.24199219,5.375 8,5.375 L8,5.375 C7.75800781,5.375 7.5625,5.57050781 7.5625,5.8125 L7.5625,11.9375 C7.5625,12.1794922 7.75800781,12.375 8,12.375 L8,12.375 C8.24199219,12.375 8.4375,12.1794922 8.4375,11.9375 L8.4375,5.8125 L8.4375,5.8125 Z"
                id="Shape-Copy-2"
                transform="translate(8.000000, 8.000000) scale(1, -1) translate(-8.000000, -8.000000) "
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

// 关闭图片画廊
export const Close = ({ onClick, className }: ThumbnailsSlick) => {
  const ops = {
    id: 'Icon_CloseLine',
    width: '24px',
    height: '24px',
  };
  return (
    <div className={className} onClick={onClick}>
      <Svg {...ops}>
        <path
          d="M8.809375,8 L12.9109375,3.1109375 C12.9796875,3.0296875 12.921875,2.90625 12.815625,2.90625 L11.56875,2.90625 C11.4953125,2.90625 11.425,2.9390625 11.3765625,2.9953125 L7.99375,7.028125 L4.6109375,2.9953125 C4.5640625,2.9390625 4.49375,2.90625 4.41875,2.90625 L3.171875,2.90625 C3.065625,2.90625 3.0078125,3.0296875 3.0765625,3.1109375 L7.178125,8 L3.0765625,12.8890625 C3.0078125,12.9703125 3.065625,13.09375 3.171875,13.09375 L4.41875,13.09375 C4.4921875,13.09375 4.5625,13.0609375 4.6109375,13.0046875 L7.99375,8.971875 L11.3765625,13.0046875 C11.4234375,13.0609375 11.49375,13.09375 11.56875,13.09375 L12.815625,13.09375 C12.921875,13.09375 12.9796875,12.9703125 12.9109375,12.8890625 L8.809375,8 Z"
          id="路径"
          fill="#FFFFFF"
        ></path>
      </Svg>
    </div>
  );
};
