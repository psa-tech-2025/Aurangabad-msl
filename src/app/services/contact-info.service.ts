import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {

  private phoneSource = new BehaviorSubject<string | null>(null);
  phone$ = this.phoneSource.asObservable();

  setPhone(phone: string) {
    if (!phone) return;
    this.phoneSource.next(phone);
  }

  getPhone(): string | null {
    return this.phoneSource.value;
  }
}
