import { Component, effect, inject, signal} from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ProductsService } from '../../../products/services/products-service';

@Component({
  selector: 'app-product-admin-pages',
  imports: [],
  templateUrl: './product-admin-pages.html',
})
export class ProductAdminPages {

  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)

  productService = inject(ProductsService)

  productId = toSignal(
    this.activatedRoute.params.pipe(
      map(params => params['id'])
    )
  )

  productResource = rxResource({
    params: () =>({id: this.productId()}),
    stream : ({params}) => {
        return this.productService.getProductById(params.id)
    }
  })

  redirectEffect = effect(() =>{
    if(this.productResource.error()){
      this.router.navigate(['/admin/products'])
    }
  })

}
