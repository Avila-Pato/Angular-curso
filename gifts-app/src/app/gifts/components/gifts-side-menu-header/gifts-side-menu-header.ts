import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environmnet } from '@environments/environment';

@Component({
  selector: 'app-gifts-side-menu-header',
  imports: [],
  templateUrl: './gifts-side-menu-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiftsSideMenuHeader { 
  envs = environmnet;
}
