import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
    name: 'heroSortPipe'
})

export class HeroSortPipe implements PipeTransform {
    transform(value: Hero[], sortBy: keyof Hero | null): Hero[] {
            if(!sortBy) return value;

            switch(sortBy) {
                case 'name':
                    return value.sort((a, b) => a.name.localeCompare(b.name));
                case 'canFly':
                    return value.sort((a, b) => Number(a.canFly) - Number(b.canFly));
                case 'color':
                    return value.sort((a, b) => a.color - b.color);
                case 'creator':
                    return value.sort((a, b) => (b.creator - a.creator));

                default:
                    return value
            }

    }   
}