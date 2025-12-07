import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GiftsSideMenuHeader } from "../gifts-side-menu-header/gifts-side-menu-header";
import { GifsSideMenu } from "../gifs-side-menu-options/gifs-side-menu";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-gifts-side-menu',
  imports: [GiftsSideMenuHeader, GifsSideMenu, RouterOutlet],
  templateUrl: './gifts-side-menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiftsSideMenu { }
