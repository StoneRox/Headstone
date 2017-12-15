import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleService} from "../../services/article/article.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-articles-by-param',
  templateUrl: './articlesByParam.component.html',
  styleUrls: ['./articlesByParam.component.css']
})
export class ArticlesByParamComponent implements OnInit,OnDestroy {
    articles;
    error:string;
    category;
    currentUser = this.User.current;
    private sub$: any[]=[];
    constructor(private route: ActivatedRoute,private Article:ArticleService,private User: UserService) { }

    ngOnInit() {
        this.sub$.push(this.route.params.subscribe(params => {
            let queryProp = Object.keys(params)[0];
            let queryValue = params[queryProp];
            if(queryProp === 'category'){
                this.category = queryValue
            }
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
