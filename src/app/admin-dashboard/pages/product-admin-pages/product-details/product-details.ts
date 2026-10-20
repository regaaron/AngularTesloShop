import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { Product } from '../../../../products/interfaces/product-response.interface';
import { ProductCarousel } from '../../../../products/components/product-carousel/product-carousel';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../../utils/forms-utils';
import { FormErrorLabel } from '../../../../shared/components/form-error-label/form-error-label';
import { ProductsService } from '../../../../products/services/products-service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'product-details',
  imports: [ProductCarousel, ReactiveFormsModule, FormErrorLabel],
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {


  ngOnInit(): void {
    this.setFomrValue(this.product())
  }

  setFomrValue(fomrLike: Partial<Product>) {
    // this.productForm.patchValue(fomrLike as any)
    this.productForm.reset(this.product() as any)
    this.productForm.patchValue({ tags: fomrLike.tags?.join(',') })
  }

  product = input.required<Product>();
  wasSave = signal(false)
  tempImagenes = signal<string[]>([])
  ImageFileList: FileList|undefined = undefined

  fb = inject(FormBuilder)
  productService = inject(ProductsService)
  router = inject(Router)
  imagesToCarousel = computed(() =>{

    const currentProductImages = [...this.product().images, ...this.tempImagenes()]
    return currentProductImages

  })

  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [[]],
    tags: [''],
    gender: ['men', [Validators.required, Validators.pattern('men|women|kid|unisex')]],

  })

  sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  async OnSubmit() {
    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched();

    if (!isValid) return;

    const formValue = this.productForm.value;

    const productLike: Partial<Product> = {
      ...(formValue as any),
      tags: formValue.tags
        ?.toLowerCase()
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0) ?? []
    };

    console.log(productLike);

    if (this.product().id === 'new') {
      const product = await firstValueFrom(
        this.productService.createProduct(productLike,this.ImageFileList)
      )
      this.router.navigate(['/admin/products', product.id])


    } else {
      await firstValueFrom(
        this.productService.updateProduct(this.product().id, productLike,this.ImageFileList)
      );

    }

    this.wasSave.set(true)
    setTimeout(() => {
      this.wasSave.set(false)
    }, 3000);



  }

  onSizeClicked(size: string) {
    const currentSizes = this.productForm.value.sizes || []
    if (currentSizes.includes(size)) {
      this.productForm.patchValue({ sizes: currentSizes.filter(s => s !== size) })
    } else {
      this.productForm.patchValue({ sizes: [...currentSizes, size] })
    }
  }

  onFilesChange(event: Event) {
    const fileList = (event.target as HTMLInputElement).files
    this.ImageFileList = fileList ?? undefined

    const imageUrls = Array.from(fileList ?? [] ).map( 
      (file) => URL.createObjectURL(file)

  
    )
    this.tempImagenes.set(imageUrls)
  }


}
