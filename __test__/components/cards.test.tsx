import { AppButton } from '@/components/button';
import { OffenderCard } from '@/components/cards';
import { TOffenderSchema } from '@/lib/types';
import React from 'react';
import renderer from 'react-test-renderer';

const MockOffender: TOffenderSchema = {
  id: '1',
  name: 'ahab',
  email: 'ahab@gmail.com',
  matricNo: 'BHU/20/04/05/0010',
  statement: 'Yooooooo',
  createdAt: new Date().toString(),
}
describe('OffenderCard', () => {
  it('renders offenders name', () => {
    const tree = renderer.create(<OffenderCard offender={MockOffender} />).toJSON();
    // console.log(tree);
    // console.log(tree.children[0].children[0]);
    expect(tree.children[0].children[0]).toBe(MockOffender.name);
  });
  it('renders offenders matricNo', () => {
    const tree = renderer.create(<OffenderCard offender={MockOffender} />).toJSON();
    expect(tree.children[1].children[0]).toBe(MockOffender.matricNo);
  });
  it('renders offenders email', () => {
    const tree = renderer.create(<OffenderCard offender={MockOffender} />).toJSON();
    expect(tree.children[2].children[0]).toBe(MockOffender.email);
  });
});
