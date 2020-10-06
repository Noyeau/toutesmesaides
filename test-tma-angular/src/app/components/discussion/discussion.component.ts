import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit, AfterViewChecked {
  private _messages: any[]
  @Input() set messages(value) {
    this._messages = value
    this.scrollToBottom()
  }

  get messages(): any[] {
    return this._messages
  }

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
  }

  ngAfterViewChecked() {
    this.scrollToBottom()
  }
  getUsers() {
    this.usersService.getAll().subscribe(res => {
      this.users = res
      console.log(res)
    })
  }

  getUserColor(uid) {
    let user = this.users.find(x => x.uid == uid)
    if (!user) {
      return "#000000"
    }
    return user.color || "#ffffff"
  }

  getUserAvatar(uid) {
    let user = this.users.find(x => x.uid == uid)
    if (!user) {
      return
    }
    return user.avatar
  }

  scrollToBottom() {
    let elem = document.querySelector(".chat-list")
    elem.scrollTop = elem.scrollHeight
  }

}
