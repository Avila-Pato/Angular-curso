import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuOption } from '../../interfaces/types';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './gifs-side-menu-options.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsSideMenu { 
  menuoptions:MenuOption[] = [
    {
      icon: 'https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/48/external-trending-content-creator-tanah-basah-basic-outline-tanah-basah.png',
      label: 'Trending',
      subLabel: 'Gifs Populares',
      router: '/dashboard/trending',
    },
      {
      icon: 'https://img.icons8.com/?size=100&id=132&format=png&color=000000',
      label: 'Buscador',
      subLabel: 'Buscar Populares',
      router: '/dashboard/search',
    },
  ]
}
