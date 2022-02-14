import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Repository } from '../repository';
import { Profile } from '../profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile!: Profile;
  repository!: any;
  constructor(private profileRequest: ProfileService) {
    this.profile = new Profile("", 0, "", "", );
    this.repository = new Repository("", "", "", "");
 
  }
  search(searchItem:any) {
    this.profileRequest.getUserProfile(searchItem).then((success)=>{
      this.profile = this.profileRequest.profile
      console.log(this.profile)
       })
this.profileRequest.displayRepos(searchItem).then((success)=>{
  this.repository=this.profileRequest.repository
  console.log(this.repository)
})
 }
  
  ngOnInit(): void {
    this.search('Bett-Collins')

  }

  
}

