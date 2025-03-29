import { AbstractControl, ValidatorFn } from '@angular/forms';

export function PasswordStrengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const value = control.value;
  if (!value) return null;

  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(value);

  const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  return !valid ? { strength: true } : null;
}