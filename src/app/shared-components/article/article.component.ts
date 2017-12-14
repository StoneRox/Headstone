import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ArticleService} from "../../services/article/article.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit,OnDestroy {
    @Input() article:object;
    @Input() single:boolean;
    private sub$: any[]=[];
  constructor(private Article:ArticleService, private router:Router) { }

  ngOnInit() {
  }
    removeArticle() {
        this.sub$.push(this.Article.remove(this.article['_id']).subscribe(res=>{
            if(!res['error']){
                this.router.navigate(['/']);
            }
        }))

    }
    ngOnDestroy() {
        this.sub$.forEach(s=>{
            s.unsubscribe();
        })
    }
}
