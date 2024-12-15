// angular import
import { Component, Input, OnInit } from '@angular/core';

// project import
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

  constructor(
    private residentService: ResidentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.getResident(this.route.snapshot.params["id"]);
  }

  @Input() currentResident: Resident = {
    id: 0,
    name: '',
    gender: '',
    dob: '',
    cccd: '',
    phoneNumber: '',
  };

  getResident(id: string): void {
    this.residentService.get(id)
      .subscribe({
        next: (data) => {
          this.currentResident = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateResident(): void {
    this.residentService.update(this.currentResident.id, this.currentResident)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/manage-resident']);
        },
        error: (e) => {
          alert("Error updating residents");
          console.error(e)
        }
      });
  }
}
