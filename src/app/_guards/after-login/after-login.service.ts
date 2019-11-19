import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/_services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.token_service.isLoggeddIn()) {
      return true;
    } else {
      return this.router.navigate(['/login']);
    }
  }

  constructor(private token_service: TokenService, private router: Router) { }
}
