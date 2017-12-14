import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {Components} from '../components';
import lazyChild from "./lazy/lazy.module";
import {Guards} from "../services/guards";

const commonGuards = [Guards.AuthGuard];
const guardedPaths: any[] = [
    {path: '', loadChildren: lazyChild('home','SharedArticlesModule'), pathMatch: 'full'},
    {path: 'register', component: Components.RegisterComponent, pathMatch: 'full'},
    {path: 'login', component: Components.LoginComponent, pathMatch: 'full'},
    {path: 'category/:category', loadChildren: lazyChild('articlesByParam','SharedArticlesModule'), pathMatch: 'full'},
    {path: 'article/:id', loadChildren: lazyChild('articleDetails','SharedArticleModule'), pathMatch: 'full'},
    {path: 'tag/:tag', loadChildren: lazyChild('articlesByParam','SharedArticlesModule'), pathMatch: 'full'},
    {path: 'users', loadChildren: 'app/modules/lazy-loading/users.module#UsersModule', pathMatch: 'full'},
    {path: 'user/:username', loadChildren: lazyChild('userDetails',['SharedArticleModule','SharedUserModule']), pathMatch: 'full'},
    {path: 'create/article', loadChildren: lazyChild('createArticle','SharedArticleFormModule'), pathMatch: 'full'},
    {path: 'edit/article/:id', loadChildren: lazyChild('editArticle','SharedArticleFormModule'), pathMatch: 'full'},

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

const routes: Routes = [...[

].concat(guardedPaths),
    {path: '**', component: Components.NotfoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutesModule {
}
