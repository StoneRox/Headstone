import {Injectable} from '@angular/core';
import {baseUrl} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {
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
    query(queryObj:Object){
        let modPath = '';
        if(this.current()['roles'] && (this.current()['roles'].includes('Admin')||this.current()['roles'].includes('Mod'))){
            modPath = 'mod/'
        }
        let query = Object.keys(queryObj).map(key=>`${key}=${queryObj[key]}`);
        return this.http.get(baseUrl+`/${modPath}users?${query.join('&')}`)
    }
}
