import {noView, processContent} from 'aurelia-framework';

@noView
@processContent((compiler, resources, node, instruction) => {
  console.log({ compiler, resources, node, instruction });
  return false;
})
export class ProcessContentSample {
}
