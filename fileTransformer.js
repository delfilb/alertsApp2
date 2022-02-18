import { basename } from 'path';

export default function process(src, filename, config, options) {
  return 'module.exports = ' + JSON.stringify(basename(filename)) + ';';
}