import {processAttributes} from 'aurelia-framework';

let nextId = 1;

@processAttributes((compiler, resources, node, attributes, instruction) => {
  if (!node.id) {
    node.id = 'process-attribute-sample-' + nextId++
  }
})
export class ProcessAttributesSample {
}
