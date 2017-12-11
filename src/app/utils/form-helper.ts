import { FormGroup, Validators} from "@angular/forms";

export function generateValidators(req:boolean, pattern?:string, minLength?:number, maxLength?:number){
    let validators = [];
    if(req){
        validators.push(Validators.required)
    }
    if(pattern){
        validators.push(Validators.pattern(pattern))
    }
    if(minLength){
        validators.push(Validators.minLength(minLength))
    }
    if(maxLength){
        validators.push(Validators.maxLength(maxLength))
    }
    return validators
}
export function trimFormInputs(form:FormGroup,simple?:boolean){
    Object.keys(form.controls).forEach(controlName=>{
        let control = form.controls[controlName];
        let value = control.value;
        let newVal = value;
        if(value){
            if(value !== value.trim()){
                newVal = value.trim();
            }
            if(!simple){
                if(newVal.replace(/ {2,}/g,' ') !== newVal){
                    newVal = newVal.replace(/ {2,}/g,' ');
                }
            }
            if(newVal !== value){
                control.setValue(newVal)
            }
        }
    })
}
