export function configure(config) {
  config.globalResources([
    './elements/nav-bar', 
    './elements/flat-picker/flat-picker',
    './value-converters/date-format',
    './value-converters/filter-vendors'
  ]);
}
