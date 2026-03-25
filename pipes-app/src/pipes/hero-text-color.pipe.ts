import {  colorMapType } from './../interfaces/hero.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'heroTextColor'
})

export class HeroTextColorPipe implements PipeTransform {
    
    transform(value: colorMapType) {
        return value
    }
}