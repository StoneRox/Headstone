import {Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormGroup, FormBuilder, AbstractControl} from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import InputErrorMessagesModel from "../../models/input-error-messages.model";
import {generateValidators, trimFormInputs} from "../../utils/form-helper";

import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../services/category/category.service";
import {ArticleService} from "../../services/article/article.service";

@Component({
    selector: 'article-form',
    templateUrl: './articleForm.component.html',
    styleUrls: ['./articleForm.component.css']
})
export class ArticleFormComponent implements OnInit, OnDestroy,OnChanges {
    ngOnChanges(changes: SimpleChanges): void {
        if(this.articleForm && changes && changes.article && changes.article.currentValue){

            Object.keys(this.articleForm.controls).forEach(key=>{
                let value = changes.article.currentValue[key];
                if(key === 'tags'){
                    value = value.join(', ')
                }
                this.articleForm.controls[key].setValue(value)

            })
        }
    }
    @Input() article:object;
    @Input() edit:boolean;
    articleForm: FormGroup;
    categories;
    error: Object = {
        get(prop: string) {
            return this[prop]
        }
    };
    errorMessages: Object = InputErrorMessagesModel;
    showImage:boolean=false;
    controlsNames: string[];
    messageOnSuccess: string;
    sub$:any[]=[];
    constructor(private fb: FormBuilder,private router:Router,private Category:CategoryService,private Article:ArticleService, private route:ActivatedRoute) {
    }

    sendErrorMessage(propName: string, c: AbstractControl, submit?: boolean) {
        if ((c.dirty && c.errors) || (submit && c.errors)) {
            for (let key of Object.keys(c.errors)) {
                if (this.errorMessages[key]) {
                    this.error[propName] = this.errorMessages[key](propName, c.errors[key], key);
                    break
                }
            }
        }
        else {
            if(this.error[propName] !== 'Invalid image url')
            delete this.error[propName]
        }
    }

    save() {
        trimFormInputs(this.articleForm);
        if (this.articleForm.invalid) {
            this.controlsNames.forEach(name => {
                this.sendErrorMessage(name, this.articleForm.controls[name], true)
            });
        }
        else {
            let reqBody = this.articleForm.value;
            if(this.edit){
                this.sub$.push(
                    this.route.params.subscribe(params => {
                        if(!params['id']){
                            this.router.navigate(['/'])
                        }
                        reqBody['id'] = params['id']
                    })
                )
            }
            this.sub$.push(this.Article[this.edit?'edit':'create'](reqBody).subscribe((res) => {
                    if (res['error']) {
                        console.log(res['error']);
                    }
                    else {
                        this.messageOnSuccess = 'Article '+this.edit?'edited':'sent';
                        this.articleForm.reset();
                        setTimeout(()=>{this.router.navigate(['/article/'+res['_id']])},this.edit?100:1)
                        setTimeout(() => {
                            this.messageOnSuccess = '';
                        }, 3000);

                    }
                }
            ))
        }
    }

    ngOnInit() {
        this.sub$.push(this.Category.getAll().subscribe(categories=>{
            if(!categories['error']){
                this.categories = categories;
                this.sub$.concat(Object.keys(this.articleForm.controls).map(key => {
                    let control = this.articleForm.get(key);
                    this.articleForm.controls['category'].setValue(categories[0]);
                    return control.valueChanges
                        .debounceTime(900)
                        .subscribe(() => {
                            this.sendErrorMessage(key, control);
                        })
                }));
            }
        }));
        this.articleForm = this.fb.group({
            category:  ['', generateValidators(true)],
            title: ['', generateValidators(true, '[a-zA-Z0-9. ]+', 4, 60)],
            imageUrl: ['', generateValidators(false, '', 0, 200)],
            content: ['', generateValidators(true, '', 5, 2000)],
            tags:['']
        });
        this.controlsNames = Object.keys(this.articleForm.controls);
    }

    ngOnDestroy() {
        this.sub$.forEach(s => {
            s.unsubscribe()
        })
    }

    imageError(e?:string) {
        if(e==='clear'){
            delete this.error['imageUrl']
        }
        else {
            this.error['imageUrl'] = 'Invalid image url';
        }
    }

    showHideImage() {
        this.showImage = !this.showImage;
    }
}
