import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  contactForm: FormGroup;
  isSubmitting = signal(false);
  showSuccessMessage = signal(false);
  fieldErrors = signal<{[key: string]: string}>({});

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      privacy: [false, Validators.requiredTrue]
    });
  }

  validateField(fieldName: string): void {
    const field = this.contactForm.get(fieldName);
    if (field && field.invalid && field.touched) {
      const errors = this.fieldErrors();
      errors[fieldName] = this.getErrorMessage(fieldName, field.errors);
      this.fieldErrors.set({...errors});
    } else {
      const errors = this.fieldErrors();
      delete errors[fieldName];
      this.fieldErrors.set({...errors});
    }
  }

  getFieldError(fieldName: string): string | null {
    return this.fieldErrors()[fieldName] || null;
  }

  private getErrorMessage(fieldName: string, errors: any): string {
    if (errors?.['required']) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (errors?.['email']) {
      return 'Please enter a valid email address';
    }
    if (errors?.['minlength']) {
      const requiredLength = errors['minlength'].requiredLength;
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${requiredLength} characters`;
    }
    if (errors?.['requiredTrue']) {
      return 'You must agree to the privacy policy';
    }
    return 'Invalid input';
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting.set(true);
      
      setTimeout(() => {
        this.isSubmitting.set(false);
        this.showSuccessMessage.set(true);
        this.contactForm.reset();
        this.fieldErrors.set({});
        
        setTimeout(() => {
          this.showSuccessMessage.set(false);
        }, 5000);
      }, 2000);
    } else {
  
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
        this.validateField(key);
      });
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
