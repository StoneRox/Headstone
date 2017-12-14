import {Injectable} from '@angular/core';
import {baseUrl} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CategoryService {
    constructor(private http: HttpClient) {
    }
    getAll(){
        return this.http.get(baseUrl+'/categories')
    }
}
