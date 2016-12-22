import {ValidationRules} from 'aurelia-validation';

ValidationRules.customRule(
  'date', 
  (value, obj) => value === null || value === undefined || value === '' || !isNaN(Date.parse(value)), 
  '${$displayName} must be a valid date.'
);

ValidationRules.customRule(
  'notEmpty',
  (value, obj) => value && value.length && value.length > 0,
  '${$displayName} must contain at least one item.'
);

ValidationRules.customRule(
  'maxFileSize',
  (value, obj, maxSize) => !(value instanceof FileList)
    || value.length === 0
    || Array.from(value).every(file => file.size <= maxSize),
  '${$displayName} must be smaller than ${$config.maxSize} bytes.',
  maxSize => ({ maxSize })
);

function hasOneOfExtensions(file, extensions) {
  const fileName = file.name.toLowerCase();
  return extensions.some(ext => fileName.endsWith(ext));
}

function allHaveOneOfExtensions(files, extensions) {
  extensions = extensions.map(ext => ext.toLowerCase());
  return Array.from(files).every(file => hasOneOfExtensions(file, extensions));
}

ValidationRules.customRule(
  'fileExtension',
  (value, obj, extensions) => !(value instanceof FileList)
    || value.length === 0
    || allHaveOneOfExtensions(value, extensions),
  '${$displayName} must have one of the following extensions: ${$config.extensions.join(\', \')}.',
  extensions => ({ extensions })
);
