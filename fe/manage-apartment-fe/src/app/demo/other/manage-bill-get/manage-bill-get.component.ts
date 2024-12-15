// angular import
import { Component, Input, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';

import { ResidentService } from 'src/app/services/resident.service';
import { Resident } from 'src/app/models/resident.models';

import { Bill } from 'src/app/models/bill.models';
import { BillService } from 'src/app/services/bill.service';

import { Apartment } from 'src/app/models/apartment.models';
import { ApartmentService } from 'src/app/services/apartment.service';

@Component({
  selector: 'app-manage-bill-get',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manage-bill-get.component.html',
  styleUrls: ['./manage-bill-get.component.scss']
})

export class RootComponent implements OnInit {

  constructor(
    private residentService: ResidentService,
    private apartmentService: ApartmentService,
    private billService: BillService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.getBill(this.route.snapshot.params["id"]);
      this.retrieveResidents();
      this.retrieveApartments();
  }

  @Input() currentData: Bill = {
    id: 0,
    numberOfApartment: 0,
    residentName: '',
    date: '',
    numberElectric: 0,
    numberWater: 0,
    toiletMoney: 0,
    status: '',
  };

  getBill(id: string): void {
    this.billService.get(id)
      .subscribe({
        next: (data) => {
          this.currentData = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  residents?: Resident[];
  apartments?: Apartment[];

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
