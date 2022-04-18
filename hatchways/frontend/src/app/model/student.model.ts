
export class StudentModel {
 students: Student[] = [];
}


export class Student {
    id: number;
    city: string;
    company: string;
    email: string;
    firstName: string;
    lastName: string;
    pic: string;
    skill: string;
    grades: [string];
    tags: string[];

    constructor(id: number, city: string, company: string, email: string, firstName: string, lastName: string, pic: string, skill: string, grades: [string]) {
        this.id = id;
        this.city = city;
        this.company = company;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.pic = pic;
        this.skill = skill;
        this.grades = grades;
        this.tags = [];
    }
    
}