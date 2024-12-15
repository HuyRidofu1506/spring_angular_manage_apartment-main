// angular import
import { Component, Input, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';

import { ResidentService } from 'src/app/services/resident.service';
import { Resident } from 'src/app/models/resident.models';
import { Apartment } from 'src/app/models/apartment.models';
import { ApartmentService } from 'src/app/services/apartment.service';

@Component({
  selector: 'app-manage-apartment-edit',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manage-apartment-edit.component.html',
  styleUrls: ['./manage-apartment-edit.component.scss']
})

export class EditResidentComponent implements OnInit {
  residents?: Resident[];

  constructor(
    private residentService: ResidentService,
    private apartmentService: ApartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.get(this.route.snapshot.params["id"]);
      this.retrieveResidents();
  }

  @Input() currentResident: Resident = {
    id: 0,
    name: '',
    gender: '',
    dob: '',
    cccd: '',
    phoneNumber: '',
  };

  @Input() currentApartment: Apartment = {
    id: 0,
    numberOfApartment: 0,
    status: '',
    residentName: '',
  };

  get(id: string): void {
    this.apartmentService.get(id)
      .subscribe({
        next: (data) => {
          this.currentApartment = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  update(): void {
    this.apartmentService.update(this.currentApartment.id, this.currentApartment)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/manage-apartment']);
        },
        error: (e) => {alert("Error updating apartments"); console.error(e)}
      });
  }

  retrieveResidents(): void {
    this.residentService.getAll()
      .subscribe({
        next: (data) => {
          this.residents = data;
          console.log("data", data);
        },
        error: (e) => console.error(e)
      });
  }
}
