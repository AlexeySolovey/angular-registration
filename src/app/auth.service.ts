import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private registerUrl = "/api/register";
  private loginUrl = "/api/login";
  constructor(private http: HttpClient, private router: Router) {}

  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user);
  }

  logoutUser(): void {
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  getToken(): string {
    return localStorage.getItem("token");
  }
}
