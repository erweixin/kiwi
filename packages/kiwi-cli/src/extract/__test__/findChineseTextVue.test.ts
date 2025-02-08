import { expect, it } from 'vitest';
import * as path from 'path';
import { findTextInVue } from '../findChineseText';
import { readFile } from '../file';

const vue2MockPath = path.join(__dirname, '../__mocks__/vue/vue2.vue');

it('vue current', () => {
  const file = readFile(vue2MockPath);
  const result = findTextInVue(file);
  expect(result).toMatchSnapshot();
});
