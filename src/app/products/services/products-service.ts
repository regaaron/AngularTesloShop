import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Product, ProductResponse } from '../interfaces/product-response.interface';
import { delay, Observable, tap } from 'rxjs';
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

    getProducts(options:Options):Observable<ProductResponse> {
        const {limit =9,offset=0,gender=''} = options

        return this.http.get<ProductResponse>(`${baseUrl}/products`,{
            params:{
                limit,
                offset,
                gender,
            }
        }).pipe(
            tap((response) => {
                console.log({response});
                
            })
        )
    }

    getProductByIdSlug(idSlug:string): Observable<Product>{

        return this.http.get<Product>(`${baseUrl}/products/${idSlug}`)

    }
}
