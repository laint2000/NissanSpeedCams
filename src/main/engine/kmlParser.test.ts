import * as fs from 'fs';
import { kmlXmlParser } from './kmlParser';

describe('kmpParser', () => {
  let _testData: string = '';

  beforeAll(() => {
    _testData = loadTestXmlData();
  });

  test('must return an object', () => {
    // act
    const result = kmlXmlParser(_testData);

    // assert
    const actual = result.slice(0, 2);
    expect(actual).toEqual([
      {
        name: 'вул. Олени Теліги, 37',
        speed: '50',
        point: { lang: '30.45352909', long: '50.479648646' },
      },
      {
        name: 'Набережне шосе, 4 . (з 1 квітня по 1 листопада)...',
        speed: '50/80',
        point: { lang: '30.530181', long: '50.456731' },
      },
    ]);
  });
});

const loadTestXmlData = (): string =>
  fs.readFileSync('_testData/new.kml', 'utf8');
