import {inject, NewInstance} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {ValidationController} from 'aurelia-validation';

@inject(DialogController, NewInstance.of(ValidationController))
export class EditionDialog {

  constructor(dialogController, validationController) {
    this.dialogController = dialogController;
    this.validationController = validationController;
  }

  activate(model) {
    this.model = model;
  }

  ok() {
    this.validationController.validate().then(errors => {
      if (errors.length === 0) {
        this.dialogController.ok(this.model)
      }
    });
  }

  cancel() {
    this.dialogController.cancel();
  }
}
