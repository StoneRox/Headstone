import {NgModule} from "@angular/core";
import {ArticleComponent} from "../../shared-components/article/article.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
@NgModule({
    declarations: [ArticleComponent],
    exports: [ArticleComponent,CommonModule,RouterModule],
    imports:[CommonModule,RouterModule]
})
export class SharedArticleModule {
}
