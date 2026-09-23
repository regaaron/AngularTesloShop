import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../../products/services/products-service';
import { PaginationService } from '../../../shared/components/pagination/pagination.service';
import { Pagination } from "../../../shared/components/pagination/pagination";
import { PoruductTable } from "../../../products/components/poruduct-table/poruduct-table";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-products-admin-pages',
  imports: [Pagination, PoruductTable, RouterLink],
  templateUrl: './products-admin-pages.html',
})
export class ProductsAdminPages {

  productService = inject(ProductsService)
  paginationService = inject(PaginationService)
  router = inject(Router)
  productsPerPage = signal(10)

  productResource = rxResource({
    params: () => ({
      page: this.paginationService.currentPage() - 1,
      limit: this.productsPerPage()
    }),
    stream: ({ params }) => {
      return this.productService.getProducts({
        offset: params.page * params.limit,
        limit: this.productsPerPage()
      })
    },
  })

  onPerPageChange() {
    this.router.navigate([], {
      queryParams: { page: 1 },
      queryParamsHandling: 'merge',
    });
  }
}
