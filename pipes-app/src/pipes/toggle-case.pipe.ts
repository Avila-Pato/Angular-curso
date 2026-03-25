import { Pipe, PipeTransform } from '@angular/core';

//Selector para importar
@Pipe({
    name: 'toggleCase'
})

export class ToggleCasePipe implements PipeTransform {
    // value es el argumento, ...args son todos los argumentos que pueden ser pasados como un arreglo de elementos
    transform(value: string, upper: boolean = true): string {
       return upper ? value.toUpperCase() : value.toLowerCase();
    }
}