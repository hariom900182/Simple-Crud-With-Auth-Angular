import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import { Login } from "../models/login";
import { Broadcaster } from "../broadcaster";
import { UserService } from "../user.service";
@Component({
  selector: 'app-logiin',
  templateUrl: './logiin.component.html',
  styleUrls: ['./logiin.component.css'],
  providers: [
    Login,
    UserService
  ]
})
export class LogiinComponent implements OnInit {
  public valid:boolean;
  public loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
  });
  public user: Login;
  constructor(private formBuilder:FormBuilder,  private broadcaster: Broadcaster,  private userService: UserService) {
    this.valid = false;
    this.registerStringBroadcast();
   }

  ngOnInit() {
  }
  submit()
  {
    this.valid = false;
    this.user = new Login();
    this.user.email = this.loginForm.controls.email.value;
    this.user.password = this.loginForm.controls.password.value;
    var res = this.userService.login(this.user);
    
  }
  registerStringBroadcast() {
    this.broadcaster.on<string>('error')
      .subscribe(message => {
         this.valid = true;
      });
  }
}
