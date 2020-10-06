import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Socket} from "ngx-socket-io";
import {first, tap} from "rxjs/operators";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _users: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])


  meColor="#33cc33"
  private colorList = [
    "#3399ff",
    "#6699ff",
    "#9999ff",
    "#cc66ff",
    "#ff66ff",
    "#ff66cc",
    "#ff6699",
    "#ff6666",
    "#ff9966",
    "#ffcc66",
  ]


  constructor(
    private _http: HttpClient,
    private socket: Socket,
    private authService: AuthService
  ) {
    
    this.authService.isConnected().subscribe(res=>{
      //On prend la liste des users seulement quand on est connecté
      if(res){
        this.initUsers().subscribe()
      }
    })
    
  }

  initUsers() {
    return this._http.get('users')
      .pipe(
        first(),
        tap((res: any) => this.setUsers(res.data.map((usr, i) => {

          // Attribution des couleurs aux users en se basant sur leur ordre
          if(usr.uid == this.authService.getUser().uid){
            usr.color = this.meColor
          } else {
            usr.color = this.colorList[i]
          }

          //J'en profite pour leur attribuer un avatar mais ca serait au back de le faire ;)
          usr.avatar = "https://www.bootdey.com/img/Content/avatar/avatar"+(i+1)+".png"

          return usr
        })))
      )
  }

  setUsers(users) {
      this._users.next(users)
  }

  getAll() {
    return this._users as Observable<any[]>;
  }
}
