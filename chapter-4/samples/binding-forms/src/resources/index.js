export function configure(config) {
  config.globalResources([
    './value-converters/file-list-to-array',
    './value-converters/json'
  ]);
}
