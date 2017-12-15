import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    @Input() user:object;
    @Input() allowControl:boolean;
    avatarInEdit:boolean;
    newAvatarUrl:string;
    error: string;
  constructor(private User:UserService) { }

  ngOnInit() {
  }
    editAvatar(){
        this.avatarInEdit = !this.avatarInEdit;
        this.newAvatarUrl =''
    }
    inputToProp(e) {
        setTimeout(()=>{
            this.newAvatarUrl = e.target.value;
        },1000)

    }
    imageError(e?:string) {
        if(e==='clear'){
            delete this.error
        }
        else {
            this.error = 'Invalid image url';
        }
    }
    save(e){
      e.preventDefault();
      if(!this.error){
            this.User.edit(this.user['_id'],{attr:{avatar:this.newAvatarUrl}}).subscribe(res=>{
                if(!res['error']){
                    this.user = res;
                    this.avatarInEdit = false;
                    this.newAvatarUrl = ''
                }
                else {
                    this.error = res['error'];
                    setTimeout(()=>{
                        this.error =''
                    },3000)
                }
            })
      }
    }
}
