'use strict';

const Promise = require("bluebird");
const fs = require('fs');
const readFileAsync = Promise.promisify(fs.readFile);
const writeFileAsync = Promise.promisify(fs.writeFile);

module.exports = class FileStore {

  constructor(filePath, defaultData) {
    this._filePath = filePath;
    this._data = null;
    this._defaultData = defaultData;
  }

  get data() {
    if (this._data) {
      return Promise.resolve(this._data);
    }

    return readFileAsync(this._filePath)
      .then(JSON.parse)
      .then(d => this._data = d)
      .catch(err => {
        console.log('Cannot load file: ' + err);
        this._data = Object.assign({}, this._defaultData);
        return Promise.resolve(this._data);
      });
  }
  
  save() {
    return this.data
      .then(JSON.stringify)
      .then(s => writeFileAsync(this._filePath, s));
  }
}
