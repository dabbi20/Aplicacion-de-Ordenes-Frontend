import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ProductService } from '../service/product.service';
import { CreateProductRequest } from '../models/create-product-request.model';

@Component({
  selector: 'app-create-product-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-product-page.component.html'
})
export class CreateProductPageComponent {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);

  isLoading = false;
  errorMessage = '';

  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    available: [true],
    imageUrl: ['', [Validators.required]]
  });

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const request: CreateProductRequest = {
      name: this.productForm.value.name ?? '',
      description: this.productForm.value.description ?? '',
      price: Number(this.productForm.value.price ?? 0),
      available: this.productForm.value.available ?? true,
      imageUrl: this.productForm.value.imageUrl ?? ''
    };

    this.productService.createProduct(request).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/products']);
      },
      error: (error) => {
        console.error('Error creating product:', error);
        this.isLoading = false;
        this.errorMessage = error?.error?.message || 'No se pudo crear el producto';
      }
    });
  }
}