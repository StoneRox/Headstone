import {Injectable} from '@angular/core';

@Injectable()
export class UserService {
    constructor() {
    }
    remember(user:object){
        localStorage.user = JSON.stringify(user)
    }
    current(){
        let user = {};
        try {
            user = JSON.parse(localStorage.user)
        }
        catch (e){}
        return user
    }
}
