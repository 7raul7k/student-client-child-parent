import {Component, OnInit} from '@angular/core';
import {StudentService} from "../../service/student-service";
import {Observable} from "rxjs";
import {StudentDTO} from "../../models/api/StudentDTO";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{


  public studentAction$: Observable<StudentDTO[]> | undefined
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentAction$ = this.studentService.studentAction$;
  }


}

