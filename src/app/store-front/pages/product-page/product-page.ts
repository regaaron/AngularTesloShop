import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../products/services/products-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCard } from "../../../products/components/product-card/product-card";
import { ProductCarousel } from "../../../products/components/product-carousel/product-carousel";
import { CurrencyPipe, TitleCasePipe } from '@angular/common';

@Component({
  imports: [ProductCarousel,CurrencyPipe,TitleCasePipe],
  selector: 'app-product-page',
  templateUrl: './product-page.html',
})
export class ProductPage {

  ActivatedRoute = inject(ActivatedRoute)
  productService = inject(ProductsService);

  producIdSlug: string  = this.ActivatedRoute.snapshot.params['idSlug'];

  productResource = rxResource({
    params: () => ({idSlug: this.producIdSlug}),
    stream: ({params}) =>{
      return this.productService.getProductByIdSlug(params.idSlug)
    }
  })


}
