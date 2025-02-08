import { expect, it } from 'vitest';
import * as path from 'path';
import { translateTextByLlm } from '../utils';

const toUpperCase = (a: string) => a.toUpperCase();

const mockPath = path.join(__dirname, '../__mocks__');

it('toUpperCase', async () => {
  const result = await translateTextByLlm({
    source_lang: 'zh-CN',
    target_lang: '英文',
    content: ['取消'],
    glossary: {
      'Pro Edition': '专业版333' // 可选术语表
    }
  });
  console.log(typeof result);
  // expect(result).toMatchSnapshot()
});
