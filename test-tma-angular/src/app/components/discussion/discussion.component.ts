import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {
  @Input() messages: any[]

  public me = null;

  private users;

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    //On récupère les information sur l'utilisateur connecté
    this.me = this.authService.getUser()
    this.getUsers()
      console.log(this.messages, this.me)
  }

  getUsers() {
    this.usersService.getAll().subscribe(res => {
      this.users = res
      console.log(res)
    })
  }

  getUserColor(uid){
    let user=this.users.find(x=>x.uid == uid)
    if(!user){
      return "#000000"
    } 
    return user.color || "#ffffff"
  }

  getUserAvatar(uid){
    let user=this.users.find(x=>x.uid == uid)
    if(!user){
      return 
    } 
    return user.avatar 
  }

}
