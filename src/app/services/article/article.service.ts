import {Injectable} from '@angular/core';
import {baseUrl} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ArticleService {
    constructor(private http: HttpClient) {
    }
    getById(payload:string){
        return this.http.get(baseUrl+'/articles?_id='+payload)
    }
    query(queryObj:Object){
        let query = Object.keys(queryObj).map(key=>`${key}=${queryObj[key]}`);
        return this.http.get(baseUrl+`/articles?${query.join('&')}`)
    }
    create(payload){
        return this.http.post(baseUrl+'/create-article',payload)
    }
    remove(id:string){
        return this.http.post(baseUrl+'/delete-article/'+id,{})
    }
    edit(payload){
        let id = payload['id'];
        delete payload['id'];
        return this.http.post(baseUrl+'/edit-article/'+id,payload)
    }
}
