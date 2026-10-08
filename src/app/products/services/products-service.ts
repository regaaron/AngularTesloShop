import { HttpClient } from '@angular/common/http';
import { inject, Service, Signal, signal } from '@angular/core';
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

    private productCache = new Map<string,Product>()

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

        if(this.productCache.has(idSlug)){
            return of(this.productCache.get(idSlug)!)
        }

        return this.http.get<Product>(`${baseUrl}/products/${idSlug}`).pipe(
            tap((resp) => this.productCache.set(idSlug,resp))
        )

    }

    getProductById(id: string): Observable<Product> {
      
        if(this.productCache.has(id)){
            return of(this.productCache.get(id)!)
        }

        return this.http.get<Product>(`${baseUrl}/products/${id}`).pipe(
            tap((resp) => this.productCache.set(id,resp))
        )

    }
}
