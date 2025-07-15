import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-manage-employee-add',
  standalone: true,
  imports: [SharedModule, FormsModule], // Add FormsModule here
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
    workingTime: ''
  };

  isSubmitted = false;

  constructor(
    private service: EmployeeService,
    private router: Router
  ) {} // Inject Router

  onSubmit(form: any) {
    this.isSubmitted = true;

    if (form.valid) {
      this.saveTutorial();
    }
  }

  saveTutorial() {
    const data = {
      name: this.data.name,
      gender: this.data.gender,
      dob: this.data.dob,
      cccd: this.data.cccd,
      phoneNumber: this.data.phoneNumber,
      position: this.data.position,
      workingTime: this.data.workingTime
    };

    this.service.create(data).subscribe({
      next: (res) => {
        alert('Employee added successfully!');
        this.data = {
          name: '',
          gender: '',
          dob: '',
          cccd: '',
          phoneNumber: '',
          position: '',
          workingTime: ''
        };
        this.isSubmitted = false; // Reset form state
        this.router.navigate(['/manage-employee']); // Navigate to /manage-employee
      },
      error: (e) => {
        alert('Error adding employee. Please try again.');
        console.error(e);
      }
    });
  }
}
