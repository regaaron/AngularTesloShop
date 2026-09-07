import { Component, inject, signal } from '@angular/core';
import { ProductCard } from "../../../products/components/product-card/product-card";
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../../products/services/products-service';
import { ProductResponse } from '../../../products/interfaces/product-response.interface';
import { Pagination } from "../../../shared/components/pagination/pagination";
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PaginationService } from '../../../shared/components/pagination/pagination.service';

@Component({
  imports: [ProductCard, Pagination],
  selector: 'app-home-page',
  templateUrl: './home-page.html',
})
export class HomePage {
  productService = inject(ProductsService);

  paginationService = inject(PaginationService)

  // activatedRoute = inject(ActivatedRoute)

  // currentPage = toSignal(
  //   this.activatedRoute.queryParamMap.pipe(
  //     map( params => (params.get('page') ? +params.get('page')! : 1)),
  //     map( page => (isNaN(page)? 1 : page))
  //   ),{
  //     initialValue: 1,
  //   }
  // )
  

  productResource = rxResource({
    params: () => ({page: this.paginationService.currentPage() - 1}),
    stream: ({params}) => {    
        return this.productService.getProducts({
          offset: params.page * 9
        })
    },
  })
}
