import {NgModule} from "@angular/core";
import {SharedArticleModule} from "./article.shared.module";
import {ArticlesComponent} from "../../shared-components/articles/articles.component";

@NgModule({
    declarations: [ArticlesComponent],
    exports: [ArticlesComponent,SharedArticleModule],
    imports:[SharedArticleModule]
})
export class SharedArticlesModule{
}
