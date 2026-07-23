import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { IAuthResponse, IUser } from '../models/iuser';

@Service()
export class Authservice {
  private http = inject(HttpClient);
  apiurl = 'http://127.0.0.1:5000/auth';

  register(user: IUser) {
    return this.http.post<IAuthResponse>(`${this.apiurl}/register`, user);
  }

  login(user: IUser) {
    return this.http.post<IAuthResponse>(`${this.apiurl}/login`, user);
  }


  savedata(data: IAuthResponse) {
    localStorage.setItem('token', data.token);
    // localStorage.setItem('user', JSON.stringify(data.user));
  }

  gettoken() {
    return localStorage.getItem('token');
  }

  isloggedin() {
    return this.gettoken() != null;
  }


  getUserIdFromToken():string|null{
    const token=this.gettoken();
    if(!token)return null;
    try{
      const payload=JSON.parse(atob(token.split('.')[1]));
      return payload.id || payload._id || payload.userId || null ;
    } catch(e){
      console.log('Error decoding token',e);
      return null;
    }
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
