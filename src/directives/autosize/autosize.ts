import { Directive } from '@angular/core';

/**
 * Generated class for the AutosizeDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[autosize]' // Attribute selector
})
export class AutosizeDirective {

  constructor() {
    console.log('Hello AutosizeDirective Directive');
  }

}
