'use strict';

const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const Promise = require("bluebird");
const unlinkAsync = Promise.promisify(fs.unlink);
const FileStore = require('../file-store');

function writeStreamToFile(filePath, stream) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    stream.pipe(file);
    stream.on('end', resolve);
    stream.on('error', reject);
  });
}

module.exports = class PhotoRepository {

  constructor(filePath, directory, events) {
    this._store = new FileStore(filePath, {
      photos: {}
    });
    this._directory = directory;
    this._events = events;
  }

  _getFilePath(fileName) {
    return path.join(this._directory, fileName);
  }

  _getMetadata(id) {
    return this._store.data
      .then(d => d.photos[id] || Promise.reject());
  }

  _setMetadata(id, metadata) {
    return this._store.data.then(d => {
      d.photos[id] = metadata;
      return this._store.save();
    });
  }

  _removeMetadata(id) {
    return this._store.data.then(d => {
      const metadata = d.photos[id];
      delete d.photos[id];
      return this._store.save().then(() => metadata);
    });
  }

  get(id) {
    return this._getMetadata(id).then(photo => {
      const filePath = this._getFilePath(photo.file);
      return {
        open: () => fs.createReadStream(filePath),
        type: photo.type
      };
    });
  }

  set(id, stream, type) {
    return this._getMetadata(id)
      .catch(err => {
        if (err) {
          throw err;
        }
        return Promise.resolve(null);
      })
      .then(oldMetadata => {
        const newMetadata = { file: uuid.v4(), type };

        let work = writeStreamToFile(this._getFilePath(newMetadata.file), stream)
          .then(() => this._setMetadata(id, newMetadata));
        if (oldMetadata) {
          work = work
            .then(() => unlinkAsync(this._getFilePath(oldMetadata.file)))
            .then(() => { this._events.publish('contact-photo.updated', { id }); });
        } else {
          work = work
            .then(() => { this._events.publish('contact-photo.created', { id }); });
        }
        return work;
      })
      .catch(err => {
        if (err) {
          throw err;
        }
      });
  }

  remove(id) {
    return this._getMetadata(id)
      .then(metadata => this._removeMetadata(id))
      .then(metadata => unlinkAsync(this._getFilePath(metadata.file)))
      .then(() => { this._events.publish('contact-photo.deleted', { id }); });
  }
}
