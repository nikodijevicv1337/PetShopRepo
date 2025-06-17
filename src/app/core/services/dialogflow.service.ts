import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DialogflowService {
  private apiUrl = 'http://localhost:3000/dialogflow';

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<{ reply: string, filters?: any }> {
    return this.http.post<{ reply: string, filters?: any }>(this.apiUrl, { message });
  }
}
