import {
  AfterViewInit, Component, ElementRef, input, OnChanges,
  OnDestroy, SimpleChanges, viewChild
} from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ProductImagePipe } from '../../pipes/product-image.pipe';

@Component({
  selector: 'product-carousel',
  imports: [ProductImagePipe],
  templateUrl: './product-carousel.html',
  styles: `
    .swiper { width: 100%; height: 500px; }
  `,
})
export class ProductCarousel implements AfterViewInit, OnChanges, OnDestroy {
  images = input.required<string[]>();
  swiperDiv = viewChild.required<ElementRef<HTMLDivElement>>('swiperDiv');
  swiper: Swiper | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images']?.firstChange) return;
    if (!this.swiper) return;

    // Esperar a que Angular termine de pintar los nuevos slides
    setTimeout(() => {
      this.swiper?.destroy(true, true);
      this.swiperInit();
    });
  }

  ngAfterViewInit(): void {
    this.swiperInit();
  }

  ngOnDestroy(): void {
    this.swiper?.destroy(true, true);
  }

  swiperInit() {
    const element = this.swiperDiv().nativeElement;
    if (!element) return;

    this.swiper = new Swiper(element, {
      direction: 'horizontal',
      loop: true,
      modules: [Navigation, Pagination],
      pagination: {
        el: element.querySelector('.swiper-pagination') as HTMLElement,
        clickable: true,
      },
      navigation: {
        nextEl: element.querySelector('.swiper-button-next') as HTMLElement,
        prevEl: element.querySelector('.swiper-button-prev') as HTMLElement,
      },
    });
  }
}