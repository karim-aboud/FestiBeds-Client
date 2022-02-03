import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean>  {
    return this.authService.auth.authState.pipe(
      take(1),
      map((authState) => !!authState),
      tap(authenticated => {
        if (!authenticated) this.authService.router.navigate(['/login'])
      })
    )
  }


}
