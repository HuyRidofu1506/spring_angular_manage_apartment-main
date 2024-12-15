// angular import
import { Component, Input, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.models';

@Component({
  selector: 'app-manage-employee-edit',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manage-employee-edit.component.html',
  styleUrls: ['./manage-employee-edit.component.scss']
})

export class RootComponent implements OnInit {

  constructor(
    private service: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.getResident(this.route.snapshot.params["id"]);
  }

  @Input() currentResident: Employee = {
    id: 0,
    name: '',
    gender: '',
    dob: '',
    cccd: '',
    phoneNumber: '',
    position: '',
    workingTime: '',
  };

  getResident(id: string): void {
    this.service.get(id)
      .subscribe({
        next: (data) => {
          this.currentResident = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateResident(): void {
    this.service.update(this.currentResident.id, this.currentResident)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/manage-employee']);
        },
        error: (e) => {alert("Error updating employee"); console.error(e)}
      });
  }
}
