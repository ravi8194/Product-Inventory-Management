import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public redirectBackToUrl: string;
  token: any;
  redirectUrl = `${environment.baseUrl}/users/`;
  headerOption = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  constructor(
    private http: HttpClient,
    private router: Router,
    private helper: JwtHelperService,
    private tokenService: TokenService
  ) {}

  isExpired;
  login(data) {
    return this.http.post<any>(
      `${this.redirectUrl}/login`,
      data,
      this.headerOption
    );
  }
  isLoggedIn() {
    this.token = this.tokenService.getToken();
    // console.log(this.token);
    return !this.tokenService.isTokenExpired();
  }
  logout(): void {
    localStorage.clear();
    this.router.navigate["/login"];
  }
  signup(data) {
    return this.http.post<any>(
      `${this.redirectUrl}/signup`,
      data,
      this.headerOption
    );
  }
}
