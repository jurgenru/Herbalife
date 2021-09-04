import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {   
    const token = localStorage.getItem('herTok');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const reqClone = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

  return next.handle(reqClone).pipe(
    catchError(this.manageError)
  );   
      
  }

  manageError(error: HttpErrorResponse) {
    return throwError('Hubo un error al hacer la peticion');
  }
}
