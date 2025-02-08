import { expect, it } from 'vitest';
import * as path from 'path';
import { findTextInJs, findTextInTs } from '../findChineseText';
import { readFile } from '../file';

const mockPath = path.join(__dirname, '../__mocks__/js/basic.jsx');
const jsMockPath = path.join(__dirname, '../__mocks__/js/basic.js');
const tsxMockPath = path.join(__dirname, '../__mocks__/ts/basic.tsx');

it('jsx current', () => {
  const file = readFile(mockPath);
  const result = findTextInJs(file);
  expect(result).toMatchSnapshot();
});

it('js current', async () => {
  const file = readFile(jsMockPath);
  const result = await findTextInJs(file);
  expect(result).toMatchSnapshot();
});

it('tsx current', () => {
  const file = readFile(tsxMockPath);
  const result = findTextInTs(file, 'test');
  expect(result).toMatchSnapshot();
});
