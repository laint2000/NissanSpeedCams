import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '_CopyTo-FlashDrive/myPOIs/myPOIWarnings/';
const FILE_NAME = 'speedcam.csv';

export const createSpeeListFile = (content: string) => {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const fileFullName = path.join(OUTPUT_DIR, FILE_NAME);
  fs.writeFileSync(fileFullName, content);
};
