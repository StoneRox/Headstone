import { Pipe, PipeTransform } from '@angular/core';
function escapeHtml (text,unesc?){
    if(typeof text !== 'string'){return text;}
    let replacer = [['&','<','>','"',"'"],['&amp;','&lt;','&gt;','&quot;','&#39;']];
    if(unesc){replacer = replacer.reverse();}
    replacer[0].forEach((r,i)=>{text = text.replace(new RegExp(r,'g'),replacer[1][i])});
    return text;
}
@Pipe({
    name: 'escape'
})
export class EscapePipe implements PipeTransform {
    transform (value: string,unescape?:boolean) {
        if(!value){
            return value
        }
        return escapeHtml(value,unescape)
    }
}

