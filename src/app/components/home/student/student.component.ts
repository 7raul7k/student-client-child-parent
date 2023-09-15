import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {StudentDTO} from "../../../models/api/StudentDTO";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit,OnDestroy{

  @Input() student : StudentDTO = {
    firstName : "",
    lastName : "",
    email : "",
    age : 0,
    adress : ""
  }
  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
