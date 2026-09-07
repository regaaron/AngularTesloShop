import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Product, ProductResponse } from '../interfaces/product-response.interface';
import { delay, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrl;

interface Options{
    limit?: number,
    offset?: number;
    gender?: string,
}
@Service()
export class ProductsService {
    private http = inject(HttpClient)
    private productsCache = new Map<string,ProductResponse>()

    getProducts(options:Options):Observable<ProductResponse> {
        const {limit =9,offset=0,gender=''} = options

        const key = `${limit}-${offset}-${gender}`

        if(this.productsCache.has(key)){
            return of(this.productsCache.get(key)!) 
        }

        return this.http.get<ProductResponse>(`${baseUrl}/products`,{
            params:{
                limit,
                offset,
                gender,
            }
        }).pipe(
            tap((response) => {console.log({response});}),
            tap((resp) => this.productsCache.set(key,resp))
        )
    }

    getProductByIdSlug(idSlug:string): Observable<Product>{

        return this.http.get<Product>(`${baseUrl}/products/${idSlug}`)

    }
}
