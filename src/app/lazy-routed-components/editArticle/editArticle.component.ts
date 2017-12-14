import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleService} from "../../services/article/article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-edit-article',
  templateUrl: './editArticle.component.html',
  styleUrls: ['./editArticle.component.css']
})
export class EditArticleComponent implements OnInit,OnDestroy {

    article;
    error:string;
    sub$:any[]=[];
    constructor(private route: ActivatedRoute,private User:UserService,private Article:ArticleService, private router:Router) { }

    ngOnInit() {
        let user = this.User.current();
        this.sub$.push(this.route.params.subscribe(params => {
            let queryValue = params['id'];
            if(queryValue){
                this.sub$.push(this.Article.query({_id:params['id']}).subscribe(articles=>{
                        if(!user['error']){
                            if(articles[0]['author']===user['username']
                                || (user['roles'] &&
                                    (user['roles'].includes('Admin')
                                || user['roles'].includes('Mod')))){
                                this.article = articles[0];
                            }
                            else {
                                this.router.navigate(['/article/'+queryValue]);
                            }
                        }
                        else {
                            this.error = user['error']
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
