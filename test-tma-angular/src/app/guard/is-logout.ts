import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { promise } from 'protractor';


@Injectable({
    providedIn: 'root'
})
export class IsLogout implements CanActivate {

    constructor(private authService: AuthService,private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean|UrlTree>  {
        return new Promise((resolve)=>{
            this.authService.isConnected().subscribe(res=>{
                if (res){
                    
                    const tree: UrlTree = this.router.parseUrl('/app');
                    resolve(tree)
                } else {
                    resolve(true)
                }
            })
        })
      
    }

}