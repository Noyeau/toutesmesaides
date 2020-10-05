import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  newMessage = "";
  messages: any[];
  users: any[];

  constructor(
    private messagesService: MessagesService,
    private usersService: UsersService

  ) { }

  ngOnInit() {
    this.messagesService.getAllMessages().subscribe(res => {
      this.messages = res
    })
    this.usersService.getAll().subscribe(res => {
      this.users = res
    })
  }

  sendNewMessage() {
    this.messagesService.sendOneMessage(this.newMessage).subscribe(res => {
      this.newMessage = null;
    })
  }

}
