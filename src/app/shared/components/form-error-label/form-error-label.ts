import { Component, computed, input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormUtils } from '../../../utils/forms-utils';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'form-error-label',
  imports: [],
  templateUrl: './form-error-label.html',
})
export class FormErrorLabel {
   control = input.required<AbstractControl>();

  // Esta señal cambia cada vez que el control cambia (valor, touched, errores)
  private cambios = toSignal(
    toObservable(this.control).pipe(switchMap((c) => c.events))
  );

  errorMessage = computed(() => {
    this.cambios(); // solo lo leemos para que se recalcule cuando haya cambios

    const control = this.control();
    const errors = control.errors ?? {};

    return control.touched && Object.keys(errors).length > 0
      ? FormUtils.getTextError(errors)
      : null;
  });
}
