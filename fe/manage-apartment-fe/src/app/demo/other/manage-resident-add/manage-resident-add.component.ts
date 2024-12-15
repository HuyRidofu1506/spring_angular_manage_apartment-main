// angular import
import { Component } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { ResidentService } from 'src/app/services/resident.service';

@Component({
  selector: 'app-manage-resident-add',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manage-resident-add.component.html',
  styleUrls: ['./manage-resident-add.component.scss']
})

export default class SamplePageComponent {
  resident = {
    name: '',
    gender: '',
    dob: '',
    cccd: '',
    phoneNumber: '',
  };

  constructor(private residentService: ResidentService) {}

  saveTutorial() {
    const data = {
      name: this.resident.name,
      gender: this.resident.gender,
      dob: this.resident.dob,
      cccd: this.resident.cccd,
      phoneNumber: this.resident.phoneNumber,
    };
    
    this.residentService.create(data).subscribe({
      next: (res) => {
        console.log("res", res);
        this.resident = {
          name: '',
          gender: '',
          dob: '',
          cccd: '',
          phoneNumber: '',
        }
      },
      error: (e) => {
        alert("Error adding resident");
        console.error("e", e)
      }
    });
  }
}
