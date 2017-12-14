import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, AbstractControl} from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import InputErrorMessagesModel from "../../models/input-error-messages.model";
import {generateValidators, trimFormInputs} from "../../utils/form-helper";
import {AuthService} from "../../services/auth/auth.service";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  error: Object = {
    get(prop: string) {
      return this[prop]
    }
  };
  errorMessages: Object = InputErrorMessagesModel;
  controlsNames: string[];
  messageOnSuccess: string;
  sub$;

  constructor(private fb: FormBuilder, private auth: AuthService, private user:UserService, private router:Router) {
  }

  sendErrorMessage(propName: string, c: AbstractControl, submit?: boolean) {
    if (['password', 'repeatPassword'].includes(propName)) {
      if (this.error['repeatPassword'] === 'The passwords should match') {
        delete this.error['repeatPassword'];
      }
      let controls = this.registerForm.controls;
      if (controls.password.value !== controls.repeatPassword.value) {
        this.error['repeatPassword'] = 'The passwords should match';
      }
    }
    if ((c.dirty && c.errors) || (submit && c.errors)) {
      for (let key of  Object.keys(c.errors)) {
        if (this.errorMessages[key]) {
          this.error[propName] = this.errorMessages[key](propName, c.errors[key], key);
          break
        }
      }
    }
    else {
      if (propName === 'repeatPassword' && this.error['repeatPassword'] === 'The passwords should match') {
        return
      }
      delete this.error[propName]
    }
  }

  save() {
    trimFormInputs(this.registerForm);
    if (this.registerForm.invalid) {
      this.controlsNames.forEach(name => {
        this.sendErrorMessage(name, this.registerForm.controls[name], true)
      });
    }
    else {
      let reqBody = {username: this.registerForm.value.username, password: this.registerForm.value.password};
      let autologin = this.registerForm.value.loginAfterRegister;
      this.sub$.push(this.auth.register(reqBody).subscribe((res) => {
          if (res['error']) {
            this.error['username'] = res['error'];
              setTimeout(()=>{
                  delete this.error['username'];
              },3000)
          }
          else {
            this.messageOnSuccess = 'Register success';
            setTimeout(() => {
              this.messageOnSuccess = '';
            }, 3000);
            this.registerForm.reset({loginAfterRegister: this.registerForm.controls.loginAfterRegister.value});
            if (autologin) {
              this.user.remember(res);
              this.router.navigate(['/'])
            }
          }
        }
      ))
    }
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', generateValidators(true, '[a-zA-Z0-9]+', 4, 14)],
      password: ['', generateValidators(true, '[a-zA-Z0-9]+', 5, 12)],
      repeatPassword: ['', generateValidators(true, '[a-zA-Z0-9]+', 5, 12)],
      loginAfterRegister: false,
    });
    this.sub$ = Object.keys(this.registerForm.controls).map(key => {
      let control = this.registerForm.get(key);
      return control.valueChanges
        .debounceTime(900)
        .subscribe(() => {
          this.sendErrorMessage(key, control)
        })
    });
    this.controlsNames = Object.keys(this.registerForm.controls);
  }

  ngOnDestroy() {
    this.sub$.forEach(s => {
      s.unsubscribe();
    })
  }

  checkBoxChangeValue(e) {
    this.registerForm.controls[e.target.id].setValue((!eval(e.target.value)).toString());
  }
}
