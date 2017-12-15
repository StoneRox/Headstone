import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router, CanLoad} from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminGuard implements CanActivate,CanLoad {
    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {

        try {
            if (!JSON.parse(localStorage.user)['roles']) {
                this.router.navigate(['/']);
                return false
            }
            console.log(JSON.parse(localStorage.user).roles.includes('Admin'));
        }
        catch (e){
            if(route.path===''){
                return false
            }
        }
        return true;
    }
    constructor(private router: Router) {
    }
    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        try {
            if (!JSON.parse(localStorage.user).roles) {
                this.router.navigate(['/']);
                return false
            }
        }
        catch (e){
            if(state.url===''){
                return false
            }
        }
        return true;
    }
}
