import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ToggleCasePipe } from '../../../pipes/toggle-case.pipe';
import { heroes } from '../../data/heroes.data';
import { I18nSelectPipe } from '@angular/common';
import { HeroColorPipeTsPipe } from '../../../pipes/HeroColor.pipe';
import { HeroCreatorPipe } from '../../../pipes/hero-creator.pipe';
import { Hero } from '../../../interfaces/hero.interface';
import { HeroSortPipe } from '../../../pipes/hero-sort.pipe';
import { HeroFilterPipe } from '../../../pipes/hero.filter.pipe';

@Component({
  selector: 'app-custom-page',
  imports: [ToggleCasePipe, I18nSelectPipe, HeroColorPipeTsPipe, ToggleCasePipe, HeroCreatorPipe, HeroSortPipe, HeroFilterPipe],
  templateUrl: './custom-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CustomPage {

  name = signal('Pato avila')
  upperCase = signal(true)

  //I18select
  canFly = signal({
    'true': 'Puede volar',
    'false': 'No puede volar'
  })

  heroes = signal(heroes)

  //pipe personalizado
  heroColor = signal(HeroColorPipeTsPipe)
  //Filtos personalisados
  sortBy = signal<keyof Hero | null>(null)
  //Serach
  searchQuery = signal('')

}
