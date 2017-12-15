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
    {path: 'users', loadChildren: lazyChild('users'), pathMatch: 'full'},
    {path: 'user/:username', loadChildren: lazyChild('userDetails',['SharedArticleModule','SharedUserModule']), pathMatch: 'full'},
    {path: 'create/article', loadChildren: lazyChild('createArticle','SharedArticleFormModule'), pathMatch: 'full'},
    {path: 'edit/article/:id', loadChildren: lazyChild('editArticle','SharedArticleFormModule'), pathMatch: 'full'},
    {path: 'me', loadChildren: lazyChild('userDetails',['SharedArticleModule','SharedUserModule']), pathMatch: 'full'},

    {path: 'create/category',canActivate:[Guards.AdminGuard],canLoad:[Guards.AdminGuard], loadChildren: lazyChild('categoryControl',['SharedCategoryFormModule']), pathMatch: 'full'},
    {path: 'edit/category/:name',canActivate:[Guards.AdminGuard],canLoad:[Guards.AdminGuard], loadChildren: lazyChild('categoryControl',['SharedCategoryFormModule']), pathMatch: 'full'},

]
    .map(p => {
        if (!p['canActivate']) {
            p['canActivate'] = commonGuards;
        }
        else {
            p['canActivate'] = p['canActivate'].concat(commonGuards);
        }
        if (!p['canLoad']) {
            p['canLoad'] = commonGuards;
        }
        else {
            p['canLoad'] = p['canLoad'].concat(commonGuards);
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
