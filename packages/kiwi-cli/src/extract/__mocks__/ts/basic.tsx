import { FC } from 'react';

export interface IBasicProps {}

export const Basic: FC<IBasicProps> = props => {
  const test = '[js]初始化变量文案';
  const temp = `${test} [js]模版变量文案`;
  return <div>[js] jsx内置文案</div>;
};
