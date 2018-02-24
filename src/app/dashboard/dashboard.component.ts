import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import { Broadcaster } from "../broadcaster";
import { Listing } from "../models/listing";
import { ListingService } from "../listing.service";
import {Router} from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { listener } from '@angular/core/src/render3/instructions';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [
    Listing,
    ListingService
  ]
})
export class DashboardComponent implements OnInit {
  public valid: boolean;
  public listing: Listing;
  public data: any;
  public user:any;
  public addOrUpdate:boolean;
  public selectedListItem: any;
  listingForm = this.formBuilder.group({
      title: ['', Validators.required],
      detail: ['', Validators.required],

  });
  constructor(private formBuilder:FormBuilder, private router: Router  ,private broadcaster: Broadcaster,  private listingService: ListingService,  private localStorageService: LocalStorageService) {
    this.valid = false;
    this.listing = new Listing();
    this.addOrUpdate = false;
    this.registerStringBroadcast() 
   }

  ngOnInit() {
    this.setAuth();
    this.read();
    
  }
  setAuth()
  {
    this.user = this.localStorageService.get("currentUser");
    if(!this.user)
    {
      this.router.navigate(["/"]);
    }
  }
  submit()
  {
    this.valid = false;    
    this.listing.title = this.listingForm.controls.title.value;
    this.listing.detail = this.listingForm.controls.detail.value;
    if(this.addOrUpdate == false)
      var res = this.listingService.add(this.listing,this.user);
    else
    {
      this.selectedListItem.title = this.listingForm.controls.title.value;
      this.selectedListItem.detail = this.listingForm.controls.detail.value;
      var res = this.listingService.update(this.selectedListItem,this.user);
    }  
  }
  delete(listing:any)
  {
    console.log("delete");
    var res = this.listingService.delete(listing,this.user);
  }
  addnew()
  {
    this.addOrUpdate = false;
    this.listingForm.controls.title.setValue("");
    this.listingForm.controls.detail.setValue("");
  }
  update(listing: any)
  {
    this.selectedListItem = listing;
    
   this.addOrUpdate = true;
   this.listingForm.controls.title.setValue(listing.title);
   this.listingForm.controls.detail.setValue(listing.detail);
    
  }
  read()
  {

    this.listingService.readForUser(this.user);
  }
  registerStringBroadcast() {
    this.broadcaster.on<string>('error')
      .subscribe(message => {
         this.valid = true;
      });
    this.broadcaster.on<any>('reload')
      .subscribe(data => {
         this.data = data;
         this.listingForm = this.formBuilder.group({
          title: ['', Validators.required],
          detail: ['', Validators.required],
    
        });
        this.selectedListItem = null;
        this.addOrUpdate = false;
      });
  }

}
