import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
const baseUrl = 'http://localhost:3000';
const LOGIN = '/login';
const REGISTER = '/register';
const LOGOUT = '/logout';
@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {
    }
    login(payload){
        console.log(payload);
        return this.http.post(baseUrl+LOGIN,payload)
    }
    register(payload){
      return this.http.post(baseUrl+REGISTER,payload)
    }
    logout(){
        return this.http.post(baseUrl+LOGOUT,{})
    }
}
export {baseUrl}
