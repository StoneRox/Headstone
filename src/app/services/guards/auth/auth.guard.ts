import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {
    }
    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        try {
            if (!JSON.parse(localStorage.user).authtoken) {
                this.router.navigate(['/login'])
            }
        }
        catch (e){
            if(!state.url.match(/login|register/g)){
                this.router.navigate(['/login'])
            }
        }

        return true;
    }
}
