import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserRequest } from '../../interfaces/user-request.interface';
import { MileSeparatorPipe } from '../../pipes/mile-separator.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MileSeparatorPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent {
  // Services
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);

  // Data
  public error?: string;
  public loading = false;
  public form = this.fb.group({
    tipoDocumento: ['', Validators.required],
    numeroDocumento: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.minLength(8),
        Validators.maxLength(11),
      ],
    ],
  });

  // Envío del formulario
  onSubmit() {
    this.error = undefined;

    //Si no es válido activamos los errores
    if (this.form.invalid || this.loading) {
      this.form.markAllAsTouched();
      return;
    }

    //Enviamos la petición
    this.loading = true;
    this.userService.getUserInfo(this.form.value as UserRequest).subscribe({
      next: (_) => this.router.navigate(['/user-info']),
      error: (e) => {
        this.loading = false;
        this.error = e.error.message;
        this.form.reset();

        //Reseteamos el error
        setTimeout(() => {
          this.error = undefined;
        }, 3000);
      },
    });
  }

  // Formateo del campo de número de documento
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const rawValue = input.value.replace(/\./g, '');
    this.form.get('numeroDocumento')?.setValue(rawValue);
  }

  //Verifica si un campo es inválido
  isInvalidField(field: 'tipoDocumento' | 'numeroDocumento'): boolean | null {
    return (
      this.form.controls[field].errors && this.form.controls[field].touched
    );
  }

  //Trae el mensaje de error de un campo
  getFieldError(field: 'tipoDocumento' | 'numeroDocumento'): string | null {
    if (!this.form.controls[field]) return null;

    const errors = this.form.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors[key].requiredLength} caracteres.`;
        case 'maxlength':
          return `Máximo ${errors[key].requiredLength} caracteres.`;
        case 'pattern':
          const pattern = errors[key].requiredPattern;
          const patternEnd = pattern.length - 2;
          return `Solo se permite el formato ${pattern.slice(1, patternEnd)} `;
      }
    }

    return null;
  }
}
