import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private previousPageSource = new BehaviorSubject<string | null>(null);
  previousPage$ = this.previousPageSource.asObservable();

  setPreviousPage(page: string): void {
    this.previousPageSource.next(page);
  }

  getPreviousPage(): string | null {
    return this.previousPageSource.value;
  }
}