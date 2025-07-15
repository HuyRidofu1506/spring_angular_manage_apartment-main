import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';

import { ResidentService } from 'src/app/services/resident.service';
import { Resident } from 'src/app/models/resident.models';

@Component({
  selector: 'app-manage-resident-edit',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manage-resident-edit.component.html',
  styleUrls: ['./manage-resident-edit.component.scss']
})
export class EditResidentComponent implements OnInit {
  @Input() currentResident: Resident = {
    id: 0,
    name: '',
    gender: '',
    dob: '',
    cccd: '',
    phoneNumber: ''
  };

  isSubmitted = false; // Add a flag to control error messages visibility

  constructor(
    private residentService: ResidentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getResident(this.route.snapshot.params['id']);
  }

  getResident(id: string): void {
    this.residentService.get(id).subscribe({
      next: (data) => {
        this.currentResident = data;
        console.log(data);
      },
      error: (e) => {
        alert('Error fetching resident data.');
        console.error(e);
      }
    });
  }

  updateResident(form: any): void {
    this.isSubmitted = true;

    if (!form.valid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    this.residentService.update(this.currentResident.id, this.currentResident).subscribe({
      next: (res) => {
        alert('Resident updated successfully!');
        this.router.navigate(['/manage-resident']);
      },
      error: (e) => {
        alert('Error updating resident. Please try again.');
        console.error(e);
      }
    });
  }
}
