// angular import
import { Component, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { Resident } from 'src/app/models/resident.models';
import { Apartment } from 'src/app/models/apartment.models';

import { BillService } from 'src/app/services/bill.service';
import { ResidentService } from 'src/app/services/resident.service';
import { ApartmentService } from 'src/app/services/apartment.service';

@Component({
  selector: 'app-manage-bill-add',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manage-bill-add.component.html',
  styleUrls: ['./manage-bill-add.component.scss']
})

export default class RootComponent implements OnInit {
  residents?: Resident[];
  apartments?: Apartment[];

  ngOnInit(): void {
    this.retrieveResidents();
    this.retrieveApartments();
  }

  data = {
    numberOfApartment: '',
    residentName: '',
    date: '',
    numberElectric: '',
    numberWater: '',
    toiletMoney: '',
    status: '',
  };

  constructor(
    private billService: BillService,
    private residentService: ResidentService,
    private apartmentService: ApartmentService,
  ) {}

  saveTutorial() {
    const data = {
      numberOfApartment: this.data.numberOfApartment,
      residentName: this.data.residentName,
      date: this.data.date,
      numberElectric: this.data.numberElectric,
      numberWater: this.data.numberWater,
      toiletMoney: this.data.toiletMoney,
      status: this.data.status,
    };
    
    this.billService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.data = {
          numberOfApartment: '',
          residentName: '',
          date: '',
          numberElectric: '',
          numberWater: '',
          toiletMoney: '',
          status: '',
        }
      },
      error: (e) => console.error(e)
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

  retrieveApartments(): void {
    this.apartmentService.getAll()
      .subscribe({
        next: (data) => {
          this.apartments = data;
          console.log("data", data);
        },
        error: (e) => console.error(e)
      });
  }
}
