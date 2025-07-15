import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.models';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-manage-employee-edit',
  standalone: true,
  imports: [SharedModule, FormsModule], // Add FormsModule here
  templateUrl: './manage-employee-edit.component.html',
  styleUrls: ['./manage-employee-edit.component.scss']
})
export class RootComponent implements OnInit {
  @Input() currentResident: Employee = {
    id: 0,
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getResident(this.route.snapshot.params['id']);
  }

  getResident(id: string): void {
    this.service.get(id).subscribe({
      next: (data) => {
        this.currentResident = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  onSubmit(form: any): void {
    this.isSubmitted = true;

    if (form.valid) {
      this.updateResident();
    }
  }

  updateResident(): void {
    this.service.update(this.currentResident.id, this.currentResident).subscribe({
      next: (res) => {
        alert('Employee updated successfully!');
        this.router.navigate(['/manage-employee']);
      },
      error: (e) => {
        alert('Error updating employee. Please try again.');
        console.error(e);
      }
    });
  }
}
