import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthResponse, USuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.baseUrl;
  private _usuario!: USuario;

  get usuario() {
    return {...this._usuario};
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth`;
    const body = {email, password};
    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap(({ok, token}) => {
        if(ok){
          localStorage.setItem('token', token!);
        }
      }),
      map( valido => valido.ok),
      catchError( err => of(err.error.msg))
    );
  }

  crearUsuario(name: string, email: string, password: string) {
    const url = `${this.baseUrl}/auth/new`;
    const body =  {name, email, password};
    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap( resp => {
          if(resp.ok) {
            localStorage.setItem('token', resp.token!);
          }
        }),
        map(valido => valido.ok),
        catchError( err => of(err.error.msg))
      );
  }

  validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '');
    return this.http.get<AuthResponse>(url, {headers})
      .pipe(
        map( resp => {
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            name: resp.name!,
            uid: resp.uid!,
            email: resp.email!
          }
          return resp.ok
        }),
        catchError(err => of(false))
      );
  }

  logout() {
    localStorage.clear();
  }
}
