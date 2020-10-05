import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userList',
  templateUrl: './userList.component.html',
  styleUrls: ['./userList.component.css']
})
export class UserListComponent implements OnInit {
  @Input() users: any[]
  public me: any = null
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.me = this.authService.getUser()
  }

  getUserAvatar(uid){
    let user=this.users.find(x=>x.uid == uid)
    if(!user){
      return 
    } 
    return user.avatar 
  }

}
