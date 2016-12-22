export class GroupByValueConverter {
  toView(array, property) {
    const groups = new Map();
    for (let item of array) {
      let key = item[property];
      let group = groups.get(key);
      if (!group) {
        group = { key, items: [] };
        groups.set(key, group);
      }
      group.items.push(item);
    }
    return Array.from(groups.values());
  }
}
