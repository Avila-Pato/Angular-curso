import { Pipe, type PipeTransform } from '@angular/core';
import { Color } from '../interfaces/hero.interface';

@Pipe({
  name: 'HeroColorPipe',
})
export class HeroColorPipeTsPipe implements PipeTransform {

  transform(value: Color) {

    return Color[value];
  }

}
