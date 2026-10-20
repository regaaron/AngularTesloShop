import { Component, computed, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Product } from '../../interfaces/product-response.interface';
import { SlicePipe } from '@angular/common';
import { ProductImagePipe } from '../../pipes/product-image.pipe';
import { environment } from '../../../../environments/environment.development';


const baseUrl = environment.baseUrl;
@Component({
  selector: 'product-card',
  imports: [RouterLink,SlicePipe,ProductImagePipe],
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input.required<Product>();

  imageUrl = computed(()=>{
    return `${baseUrl}/files/product/${this.product().images[0]}`
  })
}
