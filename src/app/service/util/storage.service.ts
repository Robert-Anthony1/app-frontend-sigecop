import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  getItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  clear(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }


  // Métodos propios de token
  verificarSession(): boolean | undefined {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem("token");
    }
    return undefined;
  }

  getToken(): string | null {
    return this.getItem("token");
  }

  updateSession(token: string): void {
    this.setItem("token", token);
  }

  deleteSession(): void {
    this.removeItem("token");
  }

}
