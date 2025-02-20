import React, { FC } from 'react';
import { Modal as AntdModal } from 'antd'

export interface IModalProps {
}

        // onClick={() => {
        //   fetch('/api/hello', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ 
        //       key: ['i18n', ...parentKeys, property], 
        //       en: lodashGet(originObj['__metas__']['zh-CN'], [...parentKeys, property].join('.')), 
        //       cn: lodashGet(originObj['__metas__']['en-US'], [...parentKeys, property].join('.')) 
        //     })
        //   })
        // }}

export const Modal:FC<IModalProps> = (props) => {
  console.log(props);
  return (
    <span
      data-i18n-key={props['data-i18n-key']}
      data-i18n-cn={props['data-i18n-cn']}
      data-i18n-en={props['data-i18n-en']}
      >
      {props.children}
      <AntdModal open />
    </span>
  );
}
