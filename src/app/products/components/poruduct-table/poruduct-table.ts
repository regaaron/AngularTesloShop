import { Component, input } from '@angular/core';
import { Product } from '../../interfaces/product-response.interface';
import { ProductImagePipe } from '../../pipes/product-image.pipe';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-poruduct-table',
  imports: [ProductImagePipe,RouterLink,CurrencyPipe],
  templateUrl: './poruduct-table.html',
})
export class PoruductTable {
  products = input.required<Product[]>()
}
