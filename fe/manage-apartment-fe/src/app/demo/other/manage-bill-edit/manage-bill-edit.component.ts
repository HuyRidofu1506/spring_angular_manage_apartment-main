import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ResidentService } from 'src/app/services/resident.service';
import { Resident } from 'src/app/models/resident.models';

import { BillService } from 'src/app/services/bill.service';
import { Bill } from 'src/app/models/bill.models';

import { ApartmentService } from 'src/app/services/apartment.service';
import { Apartment } from 'src/app/models/apartment.models';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-bill-edit',
  standalone: true,
  imports: [SharedModule, FormsModule], 
  templateUrl: './manage-bill-edit.component.html',
  styleUrls: ['./manage-bill-edit.component.scss']
})
export class EditResidentComponent implements OnInit {
  @Input() currentData: Bill = {
    id: 0,
    numberOfApartment: 0,
    residentName: '',
    date: '',
    numberElectric: 0,
    numberWater: 0,
    toiletMoney: 0,
    status: ''
  };

  residents?: Resident[];
  apartments?: Apartment[];

  isSubmitted = false;

  constructor(
    private residentService: ResidentService,
    private billService: BillService,
    private route: ActivatedRoute,
    private router: Router,
    private apartmentService: ApartmentService
  ) {}

  ngOnInit(): void {
    this.getBill(this.route.snapshot.params['id']);
    this.retrieveResidents();
    this.retrieveApartments();
  }

  getBill(id: string): void {
    this.billService.get(id).subscribe({
      next: (data) => {
        this.currentData = data;
      },
      error: (e) => console.error(e)
    });
  }

  onSubmit(form: any): void {
    this.isSubmitted = true;

    if (form.valid) {
      this.update();
    }
  }

  update(): void {
    this.billService.update(this.currentData.id, this.currentData).subscribe({
      next: (res) => {
        alert('Bill updated successfully!');
        this.router.navigate(['/manage-bill']);
      },
      error: (e) => console.error(e)
    });
  }

  retrieveResidents(): void {
    this.residentService.getAll().subscribe({
      next: (data) => {
        this.residents = data;
      },
      error: (e) => console.error(e)
    });
  }

  retrieveApartments(): void {
    this.apartmentService.getAll().subscribe({
      next: (data) => {
        this.apartments = data;
      },
      error: (e) => console.error(e)
    });
  }
}
