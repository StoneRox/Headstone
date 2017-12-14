import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleService} from "../../services/article/article.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-articles-by-param',
  templateUrl: './articlesByParam.component.html',
  styleUrls: ['./articlesByParam.component.css']
})
export class ArticlesByParamComponent implements OnInit,OnDestroy {
    articles;
    error:string;
    private sub$: any[]=[];
    constructor(private route: ActivatedRoute,private Article:ArticleService) { }

    ngOnInit() {
        this.sub$.push(this.route.params.subscribe(params => {
            let queryProp = Object.keys(params)[0];
            let queryValue = params[queryProp];
            if(params[queryProp]){
                this.sub$.push(this.Article.query({[queryProp]:queryValue}).subscribe(articles=>{
                        if(!articles['error']){
                            this.articles = articles;
                        }
                        else {
                            this.error = articles['error']
                        }
                    }

                ))
            }
        }));
    }

    ngOnDestroy() {
        this.sub$.forEach(s=>{
            s.unsubscribe();
        })
    }

}
