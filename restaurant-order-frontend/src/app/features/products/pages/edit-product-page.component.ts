import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ProductService } from '../service/product.service';
import { CreateProductRequest } from '../models/create-product-request.model';

@Component({
  selector: 'app-edit-product-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-product-page.component.html'
})
export class EditProductPageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  productId!: number;
  isLoading = false;
  isSaving = false;
  errorMessage = '';

  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    available: [true],
    imageUrl: ['', [Validators.required]]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID recibido en edit:', id);

    if (!id) {
      this.errorMessage = 'No se recibió el id del producto';
      return;
    }

    this.productId = Number(id);
    this.loadProduct();
  }

  loadProduct(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getProductById(this.productId).subscribe({
      next: (product) => {
        console.log('Producto cargado para editar:', product);

        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          available: product.available,
          imageUrl: product.imageUrl
        });

        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.errorMessage = error?.error?.message || 'No se pudo cargar el producto';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';

    const request: CreateProductRequest = {
      name: this.productForm.value.name ?? '',
      description: this.productForm.value.description ?? '',
      price: Number(this.productForm.value.price ?? 0),
      available: this.productForm.value.available ?? true,
      imageUrl: this.productForm.value.imageUrl ?? ''
    };

    this.productService.updateProduct(this.productId, request).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(['/products']);
      },
      error: (error) => {
        console.error('Error updating product:', error);
        this.errorMessage = error?.error?.message || 'No se pudo actualizar el producto';
        this.isSaving = false;
        this.cdr.detectChanges();
      }
    });
  }
}