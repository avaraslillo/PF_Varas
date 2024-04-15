import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontSizeDirective } from './directives/font-size.directive';
import { ConcatpipePipe } from './pipes/concatpipe.pipe';
import { FormFieldValidationErrorsPipe } from './pipes/form-field-validation-errors.pipe';



@NgModule({
  declarations: [
    ConcatpipePipe,
    FontSizeDirective,
    FormFieldValidationErrorsPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ConcatpipePipe,
    FontSizeDirective,
    FormFieldValidationErrorsPipe
  ]
})
export class SharedModule { }
