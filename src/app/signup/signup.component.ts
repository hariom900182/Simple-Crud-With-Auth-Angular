import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import { Signup } from "../models/signup";
import { UserService } from "../user.service";
import { Broadcaster } from "../broadcaster";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [
    Signup,
    UserService
  ]
})
export class SignupComponent implements OnInit {
  private user:Signup;
  public valid: boolean;
  signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
     
  });
  constructor(private formBuilder:FormBuilder, private userService: UserService,   private broadcaster: Broadcaster) { 
    this.valid = false;
    this.registerStringBroadcast();
  }

  ngOnInit() {
    
  }
  submit()
  {
    this.valid = false;
      this.user = new Signup();
      this.user.email = this.signupForm.controls.email.value;
      this.user.username = this.signupForm.controls.username.value;
      this.user.password = this.signupForm.controls.password.value;
      var res = this.userService.signup(this.user);
      
  }
  registerStringBroadcast() {
    this.broadcaster.on<string>('error')
      .subscribe(message => {
         this.valid = true;
      });
  }

}
