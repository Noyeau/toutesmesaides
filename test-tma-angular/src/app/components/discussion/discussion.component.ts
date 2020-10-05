import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {
  @Input() messages: any[]
@Input()
  public me=null;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    //On récupère les information sur l'utilisateur connecté
    this.me = this.authService.getUser()
    console.log(this.messages, this.me)
  }

}
