// src/app/core/project-id.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectIdInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const projectId = 'DarjedarMasala-100'; // or gp-00

    const clonedReq = req.clone({
      setHeaders: {
        'x-project-id': projectId
      }
    });

    return next.handle(clonedReq);
  }
}
