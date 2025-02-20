/**
 * @file proxy utils
 * @autor 闻木
 */

import React from 'react';
import lodashGet from 'lodash.get';

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
      return <span 
        onClick={() => {
          const newValue = window.prompt('Please enter the new value:', target[property]);
          if (newValue !== null && window.confirm('Are you sure you want to make this change?')) {
            fetch('/i18n-flow/update', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                key: ['i18n', ...parentKeys, property], 
                en: newValue, 
                cn: lodashGet(originObj['__metas__']['en-US'], [...parentKeys, property].join('.')),
                newValue
              })
            })
          }
        }}
        data-i18n-key={['i18n', ...parentKeys, property].join('.')} 
        data-i18n-cn={lodashGet(originObj['__metas__']['zh-CN'], [...parentKeys, property].join('.'))} 
        data-i18n-en={lodashGet(originObj['__metas__']['en-US'], [...parentKeys, property].join('.'))}
      >{target[property]}
      </span>;
    }
  });
};
