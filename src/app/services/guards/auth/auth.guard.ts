import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        try {
            if (!JSON.parse(localStorage.user).authtoken) {
                this.router.navigate(['/login']);
                return false
            }
        }
        catch (e){
            if(!route.path.match(/login|register/g) && route.path !== ''){
                this.router.navigate(['/login']);
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
            let user = JSON.parse(localStorage.user);
            if(state.url === '/user/'+user.username){
                this.router.navigate(['/me']);
                return false
            }
            if (!user.authtoken) {
                this.router.navigate(['/login']);
                return false
            }
            else{
                if(state.url.match(/login|register/g)){
                    this.router.navigate(['/']);
                    return false
                }
            }

        }
        catch (e){
            if(!state.url.match(/login|register/g)){
                this.router.navigate(['/login']);
                return false
            }
        }

        return true;
    }
}
