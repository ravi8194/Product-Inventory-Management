import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { CoreService } from '../core/core.service';

@Injectable({
  providedIn: "root"
})
export class LoginAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private coreService: CoreService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //console.log(this.loginService.isLoggedIn());
    if (!this.authService.isLoggedIn()) {
      return true;
    } else {
      this.coreService.navigateTo("/dashboard");
      return false;
    }
  }
}
