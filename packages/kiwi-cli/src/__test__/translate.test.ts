import { expect, it } from 'vitest';
import * as path from 'path';
import { translateTextByLlm } from '../utils';
import { translate } from '../translate';

const toUpperCase = (a: string) => a.toUpperCase();

const mockPath = path.join(__dirname, '../__mocks__');

it('translate', async () => {
  const result = await translate('llm');
  // expect(result).toMatchSnapshot()
});
