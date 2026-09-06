import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ProductResponse } from '../interfaces/product-response.interface';
import { Observable, tap } from 'rxjs';

@Service()
export class ProductsService {
    private http = inject(HttpClient)

    getProducts():Observable<ProductResponse> {
        return this.http.get<ProductResponse>('http://localhost:3000/api/products').pipe(
            tap((response) => {
                console.log({response});
                
            })
        )
    }
}
