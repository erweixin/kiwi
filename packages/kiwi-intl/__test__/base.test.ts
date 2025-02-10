import { describe, it, beforeEach, expect } from 'vitest';
import IntlFormat from '../src/index';

describe('IntlFormat', () => {
  let intlFormat;

  beforeEach(() => {
    intlFormat = IntlFormat.init('zh-CN', {
      'zh-CN': {
        value: '值',
        test: '测试',
        testTemplate: '你有{value}条未读通知',
        foo: {
          bar: 'foobar'
        },
        photo: '我{num, plural, =0 {没有照片} =1 {有1张照片} other {有#张照片}}'
      },
      'en-US': {
        value: 'value'
      }
    });
  });

  describe('get current value from certain language', () => {
    it('get key test value for current language', () => {
      expect(intlFormat.test).toBe('测试');
    });

    it('Get method: get key test value for current language', () => {
      expect(intlFormat.get('test')).toBe('测试');
      expect(intlFormat.get('photo', { num: 0 })).toBe('我没有照片');
      expect(intlFormat.get('photo', { num: 1 })).toBe('我有1张照片');
      expect(intlFormat.get('photo', { num: 1000 })).toBe('我有1,000张照片');
    });

    it('Template method: get template values for current language', () => {
      expect(intlFormat.template(intlFormat.testTemplate, { value: 3 })).toBe('你有3条未读通知');
      expect(intlFormat.get('testTemplate', { value: 3 })).toBe('你有3条未读通知');
    });

    it('Different instance values', () => {
      const intlFormat1 = IntlFormat.init('zh-CN', {
        'zh-CN': {
          test: 'firstvalue'
        }
      });
      const intlFormat2 = IntlFormat.init('zh-CN', {
        'zh-CN': {
          test: 'secondvalue'
        }
      });
      expect(intlFormat1.test).toBe('firstvalue');
      expect(intlFormat2.test).toBe('secondvalue');
    });

    it('Get deep value', () => {
      expect(intlFormat.foo.bar).toBe('foobar');
      expect(intlFormat.get('foo.bar')).toBe('foobar');
    });

    it('获取默认中文值', () => {
      intlFormat.setLang('en-US');
      expect(intlFormat.foo.bar).toBe('foobar');
      expect(intlFormat.get('foo.bar')).toBe('foobar');
    });
  });
});
