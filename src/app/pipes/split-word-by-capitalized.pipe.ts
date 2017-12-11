import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'splitByCapital'
})
export class SplitWordByCapitalizedPipe implements PipeTransform {
    transform (value: string, lowerCase) {
        value = value.split(/(?=[A-Z])/).join(' ')
        if(lowerCase){
            value = value.toLowerCase();
        }
        return value ;
    }
}
