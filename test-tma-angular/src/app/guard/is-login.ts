import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class IsLogin implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean| UrlTree> {
        return new Promise((resolve)=>{
            this.authService.isConnected().subscribe(res=>{
                if (res){
                    resolve(true)
                } else {
                    const tree: UrlTree = this.router.parseUrl('/login');
                    resolve(tree)
                }
            })
        })
      
    }

}