import { Injectable } from '@angular/core';
import { Signup } from "./models/signup";
import { Login } from "./models/login";
import { Broadcaster } from "./broadcaster";
import { StitchClientFactory } from 'mongodb-stitch';
import { LocalStorageService } from 'angular-2-local-storage';
@Injectable()
export class UserService {
  db: any;
  appId:string;
  stitchClientPromise:any;
  constructor(  private broadcaster: Broadcaster, private localStorageService: LocalStorageService) {
    this.appId = 'angapp-zajle';
    this.stitchClientPromise = StitchClientFactory.create(this.appId);
   }
   signup(model: Signup)
   {
    this.stitchClientPromise .then(client => {
      const db = client.service('mongodb', 'mongodb-atlas').db('AngApp');
      client.login().then(() =>
        db.collection('user').insertOne({owner_id: client.authedId(),email:model.email,username:model.username,password:model.password})
      ).then(docs => {
        if(docs)
        {
          this.broadcaster.broadcast('closeModal', 'some message');
        }
        else
        {
          this.broadcaster.broadcast('closeModal', 'some message');
        }

      }).catch(err => {
        this.broadcaster.broadcast('error', 'some message');
      });
    });
   }
   login(model:Login)
   {
    this.stitchClientPromise .then(client => {
      const db = client.service('mongodb', 'mongodb-atlas').db('AngApp');
      client.login().then(() =>
        db.collection('user').findOne({email:model.email})
      ).then(docs => {
        if(docs)
        {
          
          this.localStorageService.add("currentUser",{email:docs.email,username:docs.username});
          this.broadcaster.broadcast('userMenu', {email:docs.email,username:docs.username});
          this.broadcaster.broadcast('closeModal', 'some message');
        }
        else
          this.broadcaster.broadcast('error', 'some message');  

      }).catch(err => {
        this.broadcaster.broadcast('error', 'some message'); 
      });
    });
   }
}
