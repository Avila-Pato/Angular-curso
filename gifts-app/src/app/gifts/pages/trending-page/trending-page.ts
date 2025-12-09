import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';
import { GiftService } from './../../services/gifs.service';
import { AfterViewInit, Component, HostListener, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-trending-page',
  imports: [],
  templateUrl: './trending-page.html',
})
export default class TrendingPage implements OnInit, AfterViewInit {

  // Intancias de gifService si no existe crea 1 nueva por mi
  GiftService = inject(GiftService);

  ngOnInit(): void {
    this.GiftService.resetTrendingGifts();
    this.GiftService.loadTrendingGifts();
  }

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollStateService.trendingScrollState();
    if(!scrollDiv) return;

    window.scrollTo({ top: scrollDiv, behavior: 'instant' });
  }

  scrollStateService = inject(ScrollStateService)

  @HostListener('window:scroll')
  onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const clientHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollPosition = scrollTop + clientHeight;
    const threshold = scrollHeight - 500;
    const isNearBottom = scrollPosition >= threshold;

    // permite guardar la posicion del scroll
    this.scrollStateService.trendingScrollState.set(scrollTop);

    if(isNearBottom && !this.GiftService.trendingGifsLoading()) {
      this.GiftService.loadTrendingGifts();
    }
  }
}
