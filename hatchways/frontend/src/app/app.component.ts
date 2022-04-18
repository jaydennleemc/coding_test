import { Component, Input, OnInit } from '@angular/core';
import { Student, StudentModel } from './model/student.model';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  studentResp: StudentModel = new StudentModel();
  students: Student[] = [];
  nameFilter: string = '';
  tagFilter: string = '';
  isCollapsed = false;

  constructor(private apiService: ApiService) {

  }
  ngOnInit() {
    this.fetchStudents()
  }

  fetchStudents() {
    this.apiService.getStudents().subscribe((data: StudentModel) => {
      this.studentResp = data;
      this.students = this.studentResp.students;
    }, (error) => {
      console.log(error);
    }
    );
  }

  countAverage(grades: [string]) {
    let sum = 0;
    for (let i = 0; i < grades.length; i++) {
      sum += parseInt(grades[i]);
    }
    return sum / grades.length;
  }

  onSearch(type: string) {
    if (type == 'name') {
      this.students = this.studentResp.students.filter(student => student.firstName.toLowerCase().includes(this.nameFilter.toLowerCase()));
      if (this.nameFilter === '') {
        this.students = this.studentResp.students;
      }
    }

    if (type == 'tag') {      
      this.students = this.studentResp.students.filter(student => student.tags !== undefined && student.tags.includes(this.tagFilter));
      if (this.tagFilter === '') {
        this.students = this.studentResp.students;
      }
    }
  }

  toggle(element: HTMLElement) {
    element.classList.toggle('d-none');
  }

  addTag(index: number, event: any) {
    if (this.studentResp.students[index].tags == undefined) {
      this.studentResp.students[index].tags = [];
    }
    this.studentResp.students[index].tags.push(event.target.value);
    this.students = this.studentResp.students;
  }
}
