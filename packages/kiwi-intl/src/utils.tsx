/**
 * @file proxy utils
 * @autor 闻木
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import lodashGet from 'lodash.get';
import { Modal } from './Modal';
// import { Input, message } from 'antd';

/**
 * 对string进行属性拦截的通用方法，返回一个ProxyString
 * 对所有值为undefined的属性读取，会返回一个空的ProxyString
 * 拦截了String下的valueOf和toString方法，使得该ProxyString可以正常转换成原始值
 * @param str
 */
export const getDefaultProxyString = (str = '') => {
  const emptyStr = new Proxy(new String(str), {
    get(target, property) {
      if (typeof property === 'string' && ['valueOf', 'toString'].includes(property)) {
        return () => str;
      }
      if (typeof property === 'string' && target[property] === undefined) {
        return getDefaultProxyString();
      }
      return target[property];
    }
  });
  return emptyStr;
};

/**
 * 对普通对象进行属性拦截，如果属性值为undefined，则会返回一个ProxyString
 * @param obj
 */
export const getProxyObj = (obj: object, parentKeys: string[], originObj: Object) => {
  // 判断是否为开发环境
  const isDev = process.env.NODE_ENV === 'development';

  return new Proxy(obj, {
    get(target, property) {
      const val = target[property];
      console.log([...parentKeys, property])
      if (typeof property === 'string' && val === undefined) {
        return getDefaultProxyString();
      }
      if (typeof property === 'string' && typeof val === 'object') {
        return getProxyObj(val, parentKeys, originObj);
      }
      if (typeof target[property] === 'string' && target[property].includes('{')) {
        return target[property];
      }

      // 非开发环境直接返回字符串
      if (!isDev) {
        return target[property];
      }

      const handleEdit = () => {
        let inputValue = target[property];
        
        Modal.confirm({
          title: '编辑翻译',
          content: (
            <div>
              <p>当前 key: {[...parentKeys, property].join('.')}</p>
              <p>中文: {lodashGet(originObj['__metas__']['zh-CN'], [...parentKeys, property].join('.'))}</p>
              <p>英文: {lodashGet(originObj['__metas__']['en-US'], [...parentKeys, property].join('.'))}</p>
              <input 
                defaultValue={target[property]}
                onChange={(e) => {
                  inputValue = e.target.value;
                }}
                style={{
                  width: '100%',
                  padding: '4px 8px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '2px'
                }}
              />
            </div>
          ),
          okText: '确认',
          cancelText: '取消',
          onOk: async () => {
            try {
              await fetch('/i18n-flow/update', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  key: ['i18n', ...parentKeys, property],
                  en: inputValue,
                  cn: lodashGet(originObj['__metas__']['en-US'], [...parentKeys, property].join('.')),
                  newValue: inputValue
                })
              });
              window.alert('更新成功');
            } catch (error) {
              window.alert('更新失败');
              console.error(error);
            }
          },
          onCancel: () => {}
        });
      };

      // 只在开发环境添加样式
      const styleId = 'kiwi-translation-style';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
          .kiwi-translation-wrapper {
            position: relative;
            display: inline-block;
          }
          .kiwi-translation-wrapper:hover .kiwi-edit-button {
            opacity: 1;
          }
          .kiwi-edit-button {
            position: absolute;
            top: -15px;
            right: 0;
            background: #1890ff;
            color: white;
            border: none;
            border-radius: 2px;
            padding: 2px 8px;
            font-size: 12px;
            cursor: pointer;
            opacity: 0;
            z-index: 1000;
            transition: opacity 0.2s;
          }
          .kiwi-edit-button:hover {
            background: #40a9ff;
          }
        `;
        document.head.appendChild(style);
      }

      return (
        <span className="kiwi-translation-wrapper"
          data-i18n-key={['i18n', ...parentKeys, property].join('.')} 
          data-i18n-cn={lodashGet(originObj['__metas__']['zh-CN'], [...parentKeys, property].join('.'))} 
          data-i18n-en={lodashGet(originObj['__metas__']['en-US'], [...parentKeys, property].join('.'))}
        >
          {target[property]}
          <button 
            className="kiwi-edit-button"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit();
            }}
          >
            编辑
          </button>
        </span>
      );
    }
  });
};
