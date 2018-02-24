import { Component,TemplateRef ,OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Broadcaster } from "../broadcaster";
import { LocalStorageService } from 'angular-2-local-storage';
import { FormControl, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
})
export class HeaderComponent implements OnInit {
  modalRef: BsModalRef;
  public modalFor="";
  public isGuest = false;
  public user: any;
  successTemplate:any;
  public filterText: string;
  public filterForm = this.formBuilder.group({
    filterText: ['', Validators.required],
   
});
  constructor(private formBuilder:FormBuilder,private modalService: BsModalService, private router: Router, private broadcaster: Broadcaster, private localStorageService: LocalStorageService) { 
   this.filterText= "";
    this.registerStringBroadcast();
    this.setAuth();
    
  }

  ngOnInit() {
  }
  setAuth()
  {
    this.user = this.localStorageService.get("currentUser");
    if(this.user)
    {
      this.isGuest = true;
    }
    else
    {
      this.isGuest = false;
    }
  }
  signup(template: TemplateRef<any>) {
        this.modalFor = "Signup";
        this.successTemplate = template;
        this.modalRef = this.modalService.show(template);
  }
  login(template: TemplateRef<any>) {
        this.modalFor = "Login";
        this.modalRef = this.modalService.show(template);
  }
  submit()
  {
    var filterText =  this.filterForm.controls.filterText.value;
    this.broadcaster.broadcast('filter',filterText);  
  }
  
  logout() {
    this.isGuest= false;
    this.localStorageService.remove("currentUser");
    this.router.navigate(["/"]);
  }
  registerStringBroadcast() {
    this.broadcaster.on<string>('closeModal')
      .subscribe(message => {
        this.modalRef.hide();
        if(this.modalFor == "Signup")
        {
          this.modalFor = "Success";
          this.modalRef = this.modalService.show(this.successTemplate);
         
        }
      });
      this.broadcaster.on<any>('userMenu')
      .subscribe(user => {
        this.setAuth();
      });
  }
}
