import {inject, DOM, noView, bindable} from 'aurelia-framework';
import * as d3 from 'd3';

@inject(DOM.Element)
@noView(['./address-tree.css'])
export class ContactAddressTreeCustomElement {

  @bindable contacts;
  @bindable click;

  constructor(element) {
    this.element = element;
  }

  attached() {
    // Calculate the size of the viewport
    const margin = { top: 20, right: 200, bottom: 20, left: 12 };
    const height = this.element.clientHeight - margin.top - margin.bottom;
    const width = this.element.clientWidth - margin.right - margin.left;

    // Create the host elements and the tree factory
    const tree = d3.tree().size([height, width]);
    const svg = d3.select(this.element).append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom);
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Create the hierarchy, then initialize the tree from it
    const rootNode = this.createAddressTree(this.contacts);
    const hierarchy = d3.hierarchy(rootNode);
    tree(hierarchy);

    // Render the nodes and links
    const link = g.selectAll('.link')
      .data(hierarchy.descendants().slice(1))
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', d => `M${d.y},${d.x}C${(d.y + d.parent.y) / 2},
                       ${d.x} ${(d.y + d.parent.y) / 2},
                       ${d.parent.x} ${d.parent.y},
                       ${d.parent.x}`);

    const node = g.selectAll('.node')
      .data(hierarchy.descendants())
      .enter().append('g')
      .attr('class', d => 'node ' + (d.children ? 'branch' : 'leaf'))
      .attr('transform', d => `translate(${d.y}, ${d.x})`)
      .on('click', e => { this.onNodeClicked(e); });

    node.append('title')
      .text(d => d.data.name);

    node.append('circle')
      .attr('r', 10);

    node.append('text')
      .attr('dy', 5)
      .attr('x', d => d.children ? -15 : 15)
      .style('text-anchor', d => d.children ? 'end' : 'start')
      .text(d => d.data.name);
  }

  onNodeClicked(node) {
    if (node.data.contact && this.click) {
      this.click({ contact: node.data.contact });
    }
  }

  createAddressTree(contacts) {
    const rootNode = { name: '', children: [] };
    for (let contact of contacts) {
      for (let address of contact.addresses) {
        const path = this.getOrCreateAddressPath(rootNode, address);
        const pathTail = path[path.length - 1];
        pathTail.children.push({ name: contact.fullName, contact });
      }
    }
    return rootNode;
  }

  getOrCreateAddressPath(rootNode, address) {
    const countryNode = this.getOrCreateNode(rootNode, address.country);
    const stateNode = this.getOrCreateNode(countryNode, address.state);
    const cityNode = this.getOrCreateNode(stateNode, address.city);
    const streetNode = this.getOrCreateNode(cityNode, address.street);
    const numberNode = this.getOrCreateNode(streetNode, address.number);
    return [countryNode, stateNode, cityNode, streetNode, numberNode];
  }

  getOrCreateNode(parentNode, name) {
    name = name || '?';

    const normalizedName = this.normalizeNodeName(name);
    let node = parentNode.children.find(n => n.normalizedName === normalizedName);
    if (!node) {
      node = { name, normalizedName, children: [] };
      parentNode.children.push(node);
    }
    return node;
  }

  normalizeNodeName(name) {
    return name.toLowerCase().trim().replace(/\s+/, ' ');
  }
}
