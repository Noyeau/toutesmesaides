import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Socket} from "ngx-socket-io";
import {first, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _users: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])
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
    private socket: Socket
  ) {
    this.initUsers().subscribe()
  }

  initUsers() {
    return this._http.get('users')
      .pipe(
        first(),
        tap((res: any) => this.setUsers(res.data.map((usr, i) => {
          usr.color = this.colorList[i]
          usr.avatar = "https://www.bootdey.com/img/Content/avatar/avatar"+(i+1)+".png"
          return usr
        })))
      )
  }

  setUsers(users) {
    console.log(users);
      this._users.next(users)
  }

  getAll() {
    return this._users as Observable<any[]>;
  }
}
