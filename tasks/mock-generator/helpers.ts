import axios from 'axios';
import * as fs from 'fs';

import * as jsonfile from 'jsonfile';

export function writeMock(dir, name, data) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  return jsonfile.writeFileSync(`${dir}/${name}.json`, data);
}

export function getFileNameFromUrl(url) {
  return url.replace(/(^\w+:|^)\/\//, '').split('/').join('_');
}

export function generate(baseURL, baseDir, paths) {

  axios.defaults.baseURL = baseURL;

  paths.forEach((path) => {
    axios.get(path).then((response) => {
      const outFile = getFileNameFromUrl(path);
      writeMock(baseDir, getFileNameFromUrl(path), response.data);
      console.log(`Done writing ${response.config.url} to file ${outFile}.json`);
    });
  });

}
