import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ArticleFormComponent} from "../../shared-components/articleForm/articleForm.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PipeModule} from "../pipe/pipe.module";

@NgModule({
    declarations: [ArticleFormComponent],
    exports: [ArticleFormComponent,CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
    imports:[CommonModule,RouterModule,FormsModule,ReactiveFormsModule,PipeModule]
})
export class SharedArticleFormModule {
}
