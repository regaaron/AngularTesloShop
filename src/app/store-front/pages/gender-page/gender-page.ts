import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductsService } from '../../../products/services/products-service';
import { ProductCard } from '../../../products/components/product-card/product-card';
import { PaginationService } from '../../../shared/components/pagination/pagination.service';
import { Pagination } from '../../../shared/components/pagination/pagination';

@Component({
  imports: [ProductCard,Pagination],
  selector: 'app-gender-page',
  templateUrl: './gender-page.html',
})
export class GenderPage {

  route = inject(ActivatedRoute)
  private productService = inject(ProductsService);

  paginationService = inject(PaginationService)

  gender = toSignal(
    this.route.params.pipe(
      map(({ gender }) => gender)
    )
  );
  
  productResource = rxResource({
    params: () => ({
       gender: this.gender(),
       page: this.paginationService.currentPage() - 1
     }),
    stream: ({ params }) => {
      return this.productService.getProducts({
        gender: params.gender,
        offset: params.page
      })
    },
  })
}
