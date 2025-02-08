import { expect, it } from 'vitest';
import * as path from 'path';
import { extractAll, findAllChineseText } from '../extract';

const toUpperCase = (a: string) => a.toUpperCase();

const mockPath = path.join(__dirname, '../__mocks__');

it('toUpperCase', () => {
  const result = findAllChineseText(mockPath);
  expect(result).toMatchSnapshot();
});
