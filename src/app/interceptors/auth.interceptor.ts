import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone(
            {
                headers: (() => {
                    let headers = req.headers.set("Content-Type", "application/json");
                    if (!req.url.endsWith('login') && !req.url.endsWith('register')) {
                        try {
                            headers = headers.set("authorization", JSON.parse(localStorage.user).authtoken)
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }
                    return headers
                })(),
                body: (() => {
                    if (req.body && req.method !== 'GET') {
                        return JSON.stringify(req.body)
                    }
                    return "{}"
                })()
            }
        );
        return next.handle(req);
    }
}

