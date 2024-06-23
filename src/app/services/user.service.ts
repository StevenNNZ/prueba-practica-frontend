import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { UserRequest } from '../interfaces/user-request.interface';
import { User } from '../interfaces/user.interface';
import { delay, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private url = environment.apiUrl + '/user';
  private http = inject(HttpClient);

  //Data
  private _user = signal<User | undefined>(undefined);
  public user = computed(() => this._user());

  /**
   * Obtiene la información del usuario.
   * @param body - El cuerpo de la solicitud que contiene los datos del usuario.
   * @returns Un observable que emite un objeto de tipo User.
   */
  getUserInfo(body: UserRequest): Observable<User> {
    return this.http.post<User>(`${this.url}/find`, body).pipe(
      delay(500),
      tap((user) => this._user.set(user))
    );
  }
}
