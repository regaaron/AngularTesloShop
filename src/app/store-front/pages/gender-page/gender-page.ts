import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductsService } from '../../../products/services/products-service';
import { ProductCard } from '../../../products/components/product-card/product-card';

@Component({
  imports: [ProductCard],
  selector: 'app-gender-page',
  templateUrl: './gender-page.html',
})
export class GenderPage {

  route = inject(ActivatedRoute)
  private productService = inject(ProductsService);



  gender = toSignal(
    this.route.params.pipe(
      map(({ gender }) => gender)
    )
  );
  
  productResource = rxResource({
    params: () => ({ gender: this.gender() }),
    stream: ({ params }) => {
      return this.productService.getProducts({
        gender: params.gender
      })
    },
  })
}
