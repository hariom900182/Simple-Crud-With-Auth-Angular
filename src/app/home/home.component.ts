import { Component, OnInit } from '@angular/core';
import { Broadcaster } from "../broadcaster";
import { Listing } from "../models/listing";
import { ListingService } from "../listing.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    Listing,
    ListingService
  ]
})
export class HomeComponent implements OnInit {
  public data: any;
  public viewData: any;
  private filter:string;
  constructor(private broadcaster: Broadcaster,  private listingService: ListingService) { 
    this.registerStringBroadcast()
  }

  ngOnInit() {
    this.read();
  }
  read()
  {

    this.listingService.readAll();
  }
  applyFilter(msg:string)
  {
    console.log("ready to filter",msg);
    if(msg && msg != "")
    {
      this.viewData =[];
      this.data.forEach(d => {
       if(d.title.toLowerCase().indexOf(msg.toLowerCase()) != -1 || d.detail.toLowerCase().indexOf(msg.toLowerCase()) != -1)
       {
         this.viewData.push(d);
       }
      });
    }
    else
    {
      this.viewData = this.data;
    }
  }
  registerStringBroadcast() {
    
    this.broadcaster.on<any>('reload')
      .subscribe(data => {
       console.log(" data reload");
         this.data = data;
         this.applyFilter("");
      });
      this.broadcaster.on<string>('filter')
      .subscribe(message => {
       console.log(" data reload");
       this.applyFilter(message);
        
      });
  }
}
