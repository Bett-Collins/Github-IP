import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Repository } from './repository';
import { Profile } from './profile';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profile!: Profile;
  repository!: any;
  constructor(private http: HttpClient) {
    this.profile = new Profile("", 0, "", "", );
    this.repository = new Repository("", "", "", "");
  }
  getUserProfile(searchItem: string | number) {
    interface apiResults {
    
       bio:string,
      public_repos:number,
       login:string,
     avatar_url:String,
    }
    let headers = new HttpHeaders({
      authorization: 'token' + environment.apiKey,
    })
    let options = { headers: headers }
    let completeUrl = environment.apiUrl + searchItem;
    let promise = new Promise((resolve, reject) => {
      this.http.get<apiResults>(completeUrl, options).toPromise().then(response => {
        this.profile.login = response!.login
        this.profile.avatar_url = response!.avatar_url
        this.profile.bio = response!.bio
        this.profile.avatar_url =response!.avatar_url
       
        console.log(this.profile)
        resolve(null)
      },
        error => {
          reject(error)
        })
    })
    return promise
  }
  displayRepos(user: any) {
    interface apiResponse {
      login: string,
      html_url: string,
      description: string,
      language: string
    }
    let url = environment.apiUrl+ user + '/repos';
    let promise = new Promise((resolve, reject) => {
      this.http.get<apiResponse>(url).toPromise().then(response => {
      this.repository=response!
     
        console.log(this.repository)
        resolve(null)
      }, error => {
        reject();
        console.log(error)
      })
    });
    return promise
  }
}
