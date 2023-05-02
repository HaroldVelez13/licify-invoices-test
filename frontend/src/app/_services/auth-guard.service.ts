import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private storageService: StorageService, public router: Router) {}
  canActivate(): boolean {
    if (!this.storageService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
