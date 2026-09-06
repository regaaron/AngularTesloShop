import { Component, inject } from '@angular/core';
import { ProductCard } from "../../../products/components/product-card/product-card";
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../../products/services/products-service';

@Component({
  imports: [ProductCard],
  selector: 'app-home-page',
  templateUrl: './home-page.html',
})
export class HomePage {
  private productService = inject(ProductsService);

  productResource = rxResource({
    params: () => ({}),
    stream: ({params}) => {  
        return this.productService.getProducts()
    },
  })
}
