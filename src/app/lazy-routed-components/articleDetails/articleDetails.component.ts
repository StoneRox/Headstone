import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleService} from "../../services/article/article.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-article-details',
  templateUrl: './articleDetails.component.html',
  styleUrls: ['./articleDetails.component.css']
})
export class ArticleDetailsComponent implements OnInit,OnDestroy {
    article:object;
    sub$:any[]=[];
    error:string;
  constructor(private route: ActivatedRoute,private Article:ArticleService, private router: Router) { }

    ngOnInit() {
        this.sub$.push(this.route.params.subscribe(params => {
            if(params['id']){
                this.sub$.push(this.Article.getById(params['id']).subscribe(article=>{
                        if(!article['error']){
                            this.article = article[0];
                        }
                        else {
                            this.error = article['error']
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
