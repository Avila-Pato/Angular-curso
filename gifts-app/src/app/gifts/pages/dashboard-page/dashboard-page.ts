import {  Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GiftsSideMenuHeader } from "../../components/gifts-side-menu-header/gifts-side-menu-header";
import { GifsSideMenu } from "../../components/gifs-side-menu-options/gifs-side-menu";
import { GiftsSideMenu } from "../../components/gifts-side-menu/gifts-side-menu";

@Component({
  selector: 'app-dashboard-page',
  imports: [GiftsSideMenu, RouterOutlet],
  templateUrl: './dashboard-page.html',
})
export class DashboardPage { }
