import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventPlan } from '../models';

export interface BookingResponse {
  success: boolean;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private http = inject(HttpClient);

  requestBooking(backendUrl: string, plan: EventPlan): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(`${backendUrl}/bookings/request`, plan);
  }
}
