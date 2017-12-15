class InputErrorMessagesModel {
    maxlength(propName: string, error: Object) {
        return `The ${propName} should be maximum ${error['requiredLength']} characters long`
    }

    minlength(propName: string, error: Object) {
        return `The ${propName} should be minimum ${error['requiredLength']} characters long`
    }

    max(propName: string, error: Object) {
        return `The ${propName} should be maximum ${error['max']}`
    }

    min(propName: string, error: Object) {
        return `The ${propName} should be minimum ${error['min']}`
    }

    pattern(propName: string, error: Object) {
        switch (error['requiredPattern']) {
            case '^\\+?\\d+$':
                return `The ${propName} should contain only numbers and could begin with "+"`;
            case "^\\d+$":
                return `The ${propName} should be number`;
            case "^[a-zA-Z]+$":
                return `The ${propName} should contain only latin letters`;
            case "^[a-zA-Z0-9]+$":
                return `The ${propName} should contain only numbers and latin letters`;
            case "^[a-zA-Z0-9. ]+$":
                return `The ${propName} should contain only numbers, latin letters, "." and space`;
            case "^[a-zA-Z0-9. !?-]+$":
                return `The ${propName} should contain only numbers, latin letters, ".","-","!","?" and space`;
            case "^[a-zA-Z ]+$":
                return `The ${propName} should contain only latin letters and space`;
            default:
                console.log(error['requiredPattern']);
                break
        }
    }
    required(propName:string, error:Object, key:string){
        if(key === 'required'){
            return `The ${propName} is required`
        }
    }
    email(propName:string, error:Object, key:string,){
        if(key === 'email'){
            return `The ${propName} is not valid`
        }
    }
}
export default new InputErrorMessagesModel();
