import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { StudentModel } from '../model/student.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getStudents() {
    return this.http.get<StudentModel>('https://api.hatchways.io/assessment/students');
  }
}
