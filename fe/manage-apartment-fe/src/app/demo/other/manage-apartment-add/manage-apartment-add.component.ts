// angular import
import { Component, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { ApartmentService } from 'src/app/services/apartment.service';
import { ResidentService } from 'src/app/services/resident.service';

import { Resident } from 'src/app/models/resident.models';

@Component({
  selector: 'app-manage-apartment-add',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manage-apartment-add.component.html',
  styleUrls: ['./manage-apartment-add.component.scss']
})

export default class SamplePageComponent implements OnInit {
  residents?: Resident[];

  apartment = {
    numberOfApartment: '',
    status: '',
    residentName: '',
  };

  ngOnInit(): void {
    this.retrieveResidents();
  }

  constructor(
    private apartmentService: ApartmentService,
    private residentService: ResidentService,
  ) {}

  saveApartment() {
    const data = {
      numberOfApartment: this.apartment.numberOfApartment,
      status: this.apartment.status,
      residentName: this.apartment.residentName,
    };

    console.log("data", data);
    
    
    this.apartmentService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.apartment = {
          numberOfApartment: '',
          status: '',
          residentName: '',
        }
      },
      error: (e) => {
          alert("Error adding apartments")
      }
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
