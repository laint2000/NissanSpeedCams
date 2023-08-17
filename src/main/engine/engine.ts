import fs from 'fs';
import { createCommaSeparatedText } from './createCommaSeparatedText';
import { createSpeeListFile } from './createSpeeListFile';
import { kmlXmlParser } from './kmlParser';

const URL =
  // 'https://www.google.com/maps/d/kml?forcekml=1&mid=1aPQbHgj6-sXbbI4K5MDuRkK7Oe0Sr5U4';
  'https://www.google.com/maps/d/kml?forcekml=1&mid=14SmaBRAck6Ei7MKT_fDhI5ZJZNp_-NI';

interface Props {
  sendLog: (message: string) => void;
}

export const runEngine = async ({ sendLog }: Props) => {
  sendLog(`Download KML file from ${URL} ...`);
  // const { result, error } = await downloadXML(URL);
  // if (error) {
  //   sendLog(error);
  //   return;
  // }

  const result = fs.readFileSync('_testData/new.kml', 'utf8');

  sendLog('Parsing data');
  const poiItems = kmlXmlParser(result);

  sendLog('Create file content');
  const fileContent = createCommaSeparatedText(poiItems);

  sendLog('Create file');
  createSpeeListFile(fileContent);

  sendLog('Done!!!');
};

// const downloadXML = async (url: string) => {
//   try {
//     const response = await fetch(url);
//     const result = await response.text();
//     return { result };
//   } catch (error) {
//     return { result: '', error: `download error. ${error}` };
//   }
// };
