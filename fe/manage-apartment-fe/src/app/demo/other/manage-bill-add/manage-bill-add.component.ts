import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/services/bill.service';
import { ResidentService } from 'src/app/services/resident.service';
import { ApartmentService } from 'src/app/services/apartment.service';
import { Resident } from 'src/app/models/resident.models';
import { Apartment } from 'src/app/models/apartment.models';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-manage-bill-add',
  standalone: true,
  imports: [SharedModule, FormsModule],
  templateUrl: './manage-bill-add.component.html',
  styleUrls: ['./manage-bill-add.component.scss']
})
export default class RootComponent implements OnInit {
  residents?: Resident[];
  apartments?: Apartment[];

  data = {
    numberOfApartment: '',
    residentName: '',
    date: '',
    numberElectric: '',
    numberWater: '',
    toiletMoney: '',
    status: ''
  };

  isSubmitted = false;

  constructor(
    private billService: BillService,
    private residentService: ResidentService,
    private apartmentService: ApartmentService,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.retrieveResidents();
    this.retrieveApartments();
  }

  onSubmit(form: any): void {
    this.isSubmitted = true;

    if (form.valid) {
      this.saveTutorial();
    }
  }

  saveTutorial(): void {
    this.billService.create(this.data).subscribe({
      next: (res) => {
        alert('Bill added successfully!');
        this.data = {
          numberOfApartment: '',
          residentName: '',
          date: '',
          numberElectric: '',
          numberWater: '',
          toiletMoney: '',
          status: ''
        };
        this.isSubmitted = false; // Reset form state
        this.router.navigate(['/manage-bill']); // Navigate to /manage-bill
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
