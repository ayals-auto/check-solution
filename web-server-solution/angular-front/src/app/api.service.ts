import { HttpClient,HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Inum } from "./num"
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable()
export class ApiService {
    messages = "yep"
    users = []
    path = 'http://localhost:3000/'

constructor( private http: HttpClient) {}
postsNum(): Observable<Inum[]> {
    return this.http.get<Inum[]>(this.path )
        .pipe(tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );
      }

    postMessage(message) {
        this.http.post(this.path, message).subscribe(res => {
            console.log(message)
        })

    }
    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      }
}