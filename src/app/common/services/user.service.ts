import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient
  ) { }

  public getUsers() {
    return this._http.get(`${environment.URLBackend}/api/crud`);
  }

  public deleteUser(id) {
    return this._http.delete(`${environment.URLBackend}/api/crud/${id}`)
  }

  public getUser(id) {
    return this._http.get(`${environment.URLBackend}/api/crud/${id}`)
  }

  public updateUser(id, body) {
    return this._http.put(`${environment.URLBackend}/api/crud/${id}`, body)
  }

  public createUser(body) {
    return this._http.post(`${environment.URLBackend}/api/crud`, body)
  }
}
