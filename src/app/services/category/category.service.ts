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
    query(queryObj:Object){
        let query = Object.keys(queryObj).map(key=>`${key}=${queryObj[key]}`);
        return this.http.get(baseUrl+`/categories?${query.join('&')}`)
    }
    create(payload){
        return this.http.post(baseUrl+'/mod/create-category',payload)
    }
    edit(name,payload){
        return this.http.post(baseUrl+'/mod/edit-category/'+name,payload)
    }
    remove(name){
        return this.http.post(baseUrl+'/mod/delete-category/'+name,{})
    }
}
