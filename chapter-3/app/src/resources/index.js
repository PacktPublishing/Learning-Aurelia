export function configure(config) {
  config.globalResources([
    './value-converters/filter-by',
    './value-converters/group-by',
    './value-converters/order-by',
  ]);
}
