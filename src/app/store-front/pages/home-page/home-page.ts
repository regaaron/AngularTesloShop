import { Component, inject, signal } from '@angular/core';
import { ProductCard } from "../../../products/components/product-card/product-card";
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../../products/services/products-service';
import { ProductResponse } from '../../../products/interfaces/product-response.interface';
import { Pagination } from "../../../shared/components/pagination/pagination";

@Component({
  imports: [ProductCard, Pagination],
  selector: 'app-home-page',
  templateUrl: './home-page.html',
})
export class HomePage {
  private productService = inject(ProductsService);

  productResource = rxResource({
    params: () => ({}),
    stream: ({params}) => {    
        return this.productService.getProducts({})
    },
  })
}
