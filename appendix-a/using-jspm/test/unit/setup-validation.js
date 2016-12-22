import {Container} from 'aurelia-dependency-injection';
import {BindingLanguage} from 'aurelia-templating';
import {TemplatingBindingLanguage} from 'aurelia-templating-binding';
import {ValidationParser, ValidationRules} from 'aurelia-validation';
import '../../src/validation/rules';

const container = new Container();
container.registerSingleton(BindingLanguage, TemplatingBindingLanguage);
const parser = container.invoke(ValidationParser);
ValidationRules.initialize(parser);
