import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class App {

  eventTrace = [];

  constructor(events) {
    this.events = events;
  }
  
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Learning Aurelia - Chapter 2 Samples',
    config.map([
      { route: '', redirect: 'route1' },
      { route: 'route1', name: 'route1', moduleId: 'route1', nav: true, title: 'Route 1' },
      { route: 'route2', name: 'route2', moduleId: 'route2', nav: true, title: 'Route 2' },
      { route: 'canceledRoute', name: 'canceledRoute', moduleId: 'canceledRoute', nav: true, title: 'Canceled Route' },
      { route: 'errorRoute', name: 'errorRoute', moduleId: 'errorRoute', nav: true, title: 'Error Route' },
    ]);
  }

  activate() {
    this.events.subscribe(
      'router:navigation:processing', 
      e => { this.eventTrace.push(`Navigating to route ${e.instruction.fragment}`); });
    this.events.subscribe(
      'router:navigation:error', 
      e => { this.eventTrace.push(`Navigation to route ${e.instruction.fragment} failed: ${e.result.output}`); });
    this.events.subscribe(
      'router:navigation:canceled', 
      e => { this.eventTrace.push(`Navigation to route ${e.instruction.fragment} canceled`); });
    this.events.subscribe(
      'router:navigation:success', 
      e => { this.eventTrace.push(`Navigation to route ${e.instruction.fragment} successfull`); });
    this.events.subscribe(
      'router:navigation:complete', 
      e => { this.eventTrace.push(`Navigation to route ${e.instruction.fragment} completed`); });
  }
}
