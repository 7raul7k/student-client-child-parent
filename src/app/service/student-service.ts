import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {StudentDTO} from "../models/api/StudentDTO";
import {LoadingState} from "../models/api/LoadingState.enum";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

    private studentSubject = new BehaviorSubject<StudentDTO[]>([]);

    studentAction$ = this.studentSubject.asObservable();

    private loadingStateSubject = new BehaviorSubject<LoadingState>(LoadingState.Idle);

    loadingStateAction$ = this.loadingStateSubject.asObservable();

    private url = "http://localhost:8080/api/v1";
   constructor(private http : HttpClient) {
       this.loadingStateSubject.next(LoadingState.Loading)
       this.getStudentsList().subscribe({
                next: (data) => {
                    this.studentSubject.next(data);
                    this.loadingStateSubject.next(LoadingState.Success);
                },
                error: (err) => {
                    this.loadingStateSubject.next(LoadingState.Error);
                }
         });
   }
  private getStudentsList() {
     return this.http.get<StudentDTO[]>(this.url + "/all").pipe(catchError(this.handleError));


  }


  private handleError(error : HttpErrorResponse){

       this.loadingStateSubject.next(LoadingState.Error);
     if(error.error instanceof ErrorEvent){
       console.error('An error occured : ', error.error.message);
     }else{
        console.error(`Backend returned code ${error.status}, ` +
            `body was : ${error.error}`);
     }

     return  throwError(() => 'Something bad happened; please try again later.');
  }


}
