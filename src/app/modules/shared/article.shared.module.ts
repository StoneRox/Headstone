import {NgModule} from "@angular/core";
import {ArticleComponent} from "../../shared-components/article/article.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {PipeModule} from "../pipe/pipe.module";
@NgModule({
    declarations: [ArticleComponent],
    exports: [ArticleComponent,CommonModule,RouterModule,PipeModule],
    imports:[CommonModule,RouterModule,PipeModule]
})
export class SharedArticleModule {
}
