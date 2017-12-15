import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'splitByCapital'
})
export class SplitWordByCapitalizedPipe implements PipeTransform {
    transform (value: string, lowerCase) {
        if(!value){
            return value
        }
        value = value.split(/(?=[A-Z])/).join(' ')
        if(lowerCase){
            value = value.toLowerCase();
        }
        return value ;
    }
}
