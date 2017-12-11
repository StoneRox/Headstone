import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {Components} from '../components';
import LazyModules from "./lazy/lazy.module";
import {Guards} from "../services/guards";

function lazyChild(name: string, declarations?: any, imports?: any, providers?: any) {
    return () => LazyModules(name, declarations, imports, providers)
}

const commonGuards = [Guards.AuthGuard];
const guardedPaths: any[] = [
    {path: '', loadChildren: lazyChild('home'), pathMatch: 'full'},
    {path: 'register', component: Components.RegisterComponent, pathMatch: 'full'},
    {path: 'login', component: Components.LoginComponent, pathMatch: 'full'},
    /**/

]
    .map(p => {
        if (!p['canActivate']) {
            p['canActivate'] = commonGuards;
        }
        else {
            p['canActivate'] = p['canActivate'].concat(commonGuards);
        }
        return p;
    });

const routes: Routes = [...[].concat(guardedPaths),
    {path: '**', component: Components.NotfoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutesModule {
}
