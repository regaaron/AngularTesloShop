import { computed, inject, Service, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated'

const baseUrl = environment.baseUrl
@Service()
export class AuthService {

    private _authStatus = signal<AuthStatus>('checking')
    private _user = signal<User | null>(null);
    private _token = signal<string | null>(null)

    private http = inject(HttpClient)

    chechStatusResource = rxResource({
        stream: () => this.chechStatus()
    })

    authStatus = computed<AuthStatus>(() => {

        if (this._authStatus() === 'checking') return 'checking'

        if (this._user()) return 'authenticated'

        return 'not-authenticated'
    })

    user = computed(() =>  this._user() )

    token = computed(() => this._token() )

    login(email: string, password: string): Observable<boolean> {
        return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, {
            password,
            email,
        }).pipe(
            tap(resp => { this.handleAuthSuccess(resp)}),
            map(() => true),
            catchError((error: any) => this.handleAuthError(error) )
        )
    }

    chechStatus(): Observable<boolean> {

        const token = localStorage.getItem('token');

        if (!token) {
            this.logout()
            return of(false)
        }

        return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).pipe(
            tap(resp => { this.handleAuthSuccess(resp)}),
            map(() => true),
            catchError((error: any) => this.handleAuthError(error) )
        )
    }

    logout() {
        this._authStatus.set('not-authenticated')
        this._token.set(null)
        this._user.set(null)
        // localStorage.removeItem('token')

    }

    private handleAuthSuccess({ token, user }: AuthResponse) {
        this._user.set(user)
        this._authStatus.set('authenticated')
        this._token.set(token)

        localStorage.setItem('token', token)
    }

    private handleAuthError(error:any){
        this.logout();

        return of(false)
    }
}
