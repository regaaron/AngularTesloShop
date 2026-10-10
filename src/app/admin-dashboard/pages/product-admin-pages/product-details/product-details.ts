import { Component, inject, input, OnInit } from '@angular/core';
import { Product } from '../../../../products/interfaces/product-response.interface';
import { ProductCarousel } from '../../../../products/components/product-carousel/product-carousel';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../../utils/forms-utils';

@Component({
  selector: 'product-details',
  imports: [ProductCarousel,ReactiveFormsModule],
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit{
  
  ngOnInit(): void {
    this.setFomrValue(this.product())
  }

  setFomrValue(fomrLike: Partial<Product>){
    // this.productForm.patchValue(fomrLike as any)
    this.productForm.reset(this.product() as any)
    this.productForm.patchValue({tags: fomrLike.tags?.join(',')})
  }

  product = input.required<Product>();

  fb = inject(FormBuilder)

  productForm = this.fb.group({
    title: ['',Validators.required],
    description: ['',Validators.required],
    slug: ['',[Validators.required,Validators.pattern(FormUtils.slugPattern)]],
    price: [0,[Validators.required,Validators.min(0)]],
    stock: [0,[Validators.required,Validators.min(0)]],
    sizes: [['']],
    images: [[]],
    tags: [''],
    gender: ['men',[Validators.required,Validators.pattern('men|women|kid|unisex')]],

  })

  sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  OnSubmit(){
      console.log(this.productForm.value);
      
  }
}
