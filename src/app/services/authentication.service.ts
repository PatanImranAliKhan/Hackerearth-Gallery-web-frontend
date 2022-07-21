import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public uri: String= "http://localhost:2500/users";

  constructor(private http: HttpClient) { }

  ValidateUser(useremail: String)
  {
    return this.http.get(`${this.uri}/${useremail}`);
  }

}
