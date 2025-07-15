import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router'; // Import Router
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ResidentService } from 'src/app/services/resident.service';

@Component({
  selector: 'app-manage-resident-add',
  standalone: true,
  imports: [SharedModule, FormsModule], // Add FormsModule here
  templateUrl: './manage-resident-add.component.html',
  styleUrls: ['./manage-resident-add.component.scss']
})
export default class SamplePageComponent {
  resident = {
    name: '',
    gender: '',
    dob: '',
    cccd: '',
    phoneNumber: ''
  };

  isSubmitted = false;

  constructor(
    private residentService: ResidentService,
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
      name: this.resident.name,
      gender: this.resident.gender,
      dob: this.resident.dob,
      cccd: this.resident.cccd,
      phoneNumber: this.resident.phoneNumber
    };

    this.residentService.create(data).subscribe({
      next: (res) => {
        console.log('res', res);
        this.resident = {
          name: '',
          gender: '',
          dob: '',
          cccd: '',
          phoneNumber: ''
        };
        this.isSubmitted = false; // Reset after successful submission
        alert('Resident added successfully!'); // Show success alert
        this.router.navigate(['/manage-resident']); // Redirect to manage-resident page
      },
      error: (e) => {
        console.error('Error:', e);
        alert('Failed to add resident. Please try again.'); // Show error alert
      }
    });
  }
}
