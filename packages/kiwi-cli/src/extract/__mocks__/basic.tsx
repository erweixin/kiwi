import { FC } from 'react';

export interface IBasicProps {}

export const Basic: FC<IBasicProps> = props => {
  const test = '少年';
  return <div>你好</div>;
};
