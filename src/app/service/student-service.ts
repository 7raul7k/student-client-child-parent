import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {StudentDTO} from "../models/api/StudentDTO";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

    private studentSubject = new BehaviorSubject<StudentDTO[]>([]);

    studentAction$ = this.studentSubject.asObservable();

    private url = "http://localhost:8080/students/api/v1";
   constructor(private http : HttpClient) {
     this.getStudentsList().subscribe((students) => this.studentSubject.next(students))
   }

  private getStudentsList() {
     return this.http.get<StudentDTO[]>(this.url + "/all").pipe(catchError(this.handleError));
  }


  handleError(error : HttpErrorResponse){

     if(error.error instanceof ErrorEvent){
       console.error('An error occured : ', error.error.message);
     }else{
        console.error(`Backend returned code ${error.status}, ` +
            `body was : ${error.error}`);
     }

     return  throwError(() => 'Something bad happened; please try again later.');
  }


}
