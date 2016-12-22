export function configure(config) {
  config.globalResources([
    './attributes/blob-src',
    './attributes/bs-tooltip',
    './attributes/file-drop-target',
    './attributes/submit-task',

    './elements/bs-datepicker',
    './elements/file-picker',
    './elements/group-list.html',
    './elements/list-editor',
    './elements/locale-picker',
    './elements/submit-button.html',

    './value-converters/filter-by',
    './value-converters/group-by',
    './value-converters/order-by',
  ]);
}
