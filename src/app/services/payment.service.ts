import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventPlan } from '../models';

export interface CheckoutPayload {
  sourceId: string;
  amountMoney: { amount: number; currency: string };
  eventPlan: EventPlan;
}

export interface CheckoutResponse {
  payment?: Record<string, unknown>;
  orderId?: string;
}

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private http = inject(HttpClient);

  checkout(backendUrl: string, payload: CheckoutPayload): Observable<CheckoutResponse> {
    return this.http.post<CheckoutResponse>(`${backendUrl}/payments/checkout`, payload);
  }
}
