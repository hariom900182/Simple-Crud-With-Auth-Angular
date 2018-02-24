import { Injectable } from '@angular/core';
import { Signup } from "./models/signup";
import { Listing } from "./models/listing";
import { Broadcaster } from "./broadcaster";
import { StitchClientFactory } from 'mongodb-stitch';
@Injectable()
export class ListingService {
  db: any;
  appId:string;
  stitchClientPromise:any;
  public listings:any[] = [];
  constructor( private broadcaster: Broadcaster) {
    this.appId = 'angapp-zajle';
    this.stitchClientPromise = StitchClientFactory.create(this.appId);
   }
 
  add(model: Listing,user: any)
  {
    
    this.stitchClientPromise .then(client => {
      const db = client.service('mongodb', 'mongodb-atlas').db('AngApp');
      client.login().then(() =>
        db.collection('story').insertOne({owner_id: client.authedId(),title:model.title,detail:model.detail,email:user.email,status:true})
      ).then(docs => {
        this.readForUser(user);

      }).catch(err => {
        this.broadcaster.broadcast('error', 'some message');  
      });
    });
  } 
  update(model: any,user: any)
  {
    console.log("update", model);
    this.stitchClientPromise .then(client => {
      const db = client.service('mongodb', 'mongodb-atlas').db('AngApp');
      client.login().then(() =>
        db.collection('story').updateOne({ _id: model._id },{ $set: {title:model.title,detail:model.detail}} )
      ).then(docs => {
        this.readForUser(user);

      }).catch(err => {
        this.broadcaster.broadcast('error', 'some message');  
      });
    });
  }
  delete(model: any,user: any)
  {

    this.stitchClientPromise .then(client => {
      const db = client.service('mongodb', 'mongodb-atlas').db('AngApp');
      client.login().then(() =>
        db.collection('story').updateOne({ _id: model._id },{ $set: {status:false}} )
      ).then(docs => {
        this.readForUser(user);

      }).catch(err => {
        this.broadcaster.broadcast('error', 'some message');  
      });
    });
  }
  readAll()
  {
    this.stitchClientPromise .then(client => {
      const db = client.service('mongodb', 'mongodb-atlas').db('AngApp');
      client.login().then(() =>
        db.collection('story').find({status:true}).execute()
      ).then(docs => {
        if(docs)
          this.listings = docs
        else
          this.listings = [];
        this.broadcaster.broadcast('reload', docs); 

      }).catch(err => {
        this.broadcaster.broadcast('error', 'some message');  
      });
    });
  }
  readForUser(user:any)
  {
    console.log("locals" ,user);
    this.stitchClientPromise .then(client => {
      const db = client.service('mongodb', 'mongodb-atlas').db('AngApp');
      client.login().then(() =>
        db.collection('story').find({email:user.email,status:true}).execute()
      ).then(docs => {
        if(docs)
          this.listings = docs
        else
          this.listings = [];
        this.broadcaster.broadcast('reload', docs); 
      }).catch(err => {
        this.broadcaster.broadcast('error', 'some message');  
      });
    });
  }
  getListing()
  {
    return this.listings;
  }

}
