import * as fs from 'fs';
import * as jsonfile from 'jsonfile';

export function writeMock(dir, name, data) {
  const fileName = `${dir}/${name}.json`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  console.log(`Done writing ${fileName}`);
  return jsonfile.writeFileSync(fileName, data);
}
