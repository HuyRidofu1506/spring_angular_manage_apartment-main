// angular import
import { Component } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-manage-employee-add',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manage-employee-add.component.html',
  styleUrls: ['./manage-employee-add.component.scss']
})

export default class SamplePageComponent {
  data = {
    name: '',
    gender: '',
    dob: '',
    cccd: '',
    phoneNumber: '',
    position: '',
    workingTIme: '',
  };

  constructor(private service: EmployeeService) {}

  saveTutorial() {
    const data = {
      name: this.data.name,
      gender: this.data.gender,
      dob: this.data.dob,
      cccd: this.data.cccd,
      phoneNumber: this.data.phoneNumber,
      position: this.data.position,
      workingTIme: this.data.workingTIme,
    };
    
    this.service.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.data = {
          name: '',
          gender: '',
          dob: '',
          cccd: '',
          phoneNumber: '',
          position: '',
          workingTIme: '',
        }
      },
      error: (e) => {alert("Not allow for duplicate cccd field"); console.error(e)}
    });
  }
}
