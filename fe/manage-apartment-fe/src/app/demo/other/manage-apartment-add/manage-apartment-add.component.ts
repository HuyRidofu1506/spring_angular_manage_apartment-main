import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router'; // Import Router
import { ApartmentService } from 'src/app/services/apartment.service';
import { ResidentService } from 'src/app/services/resident.service';
import { Resident } from 'src/app/models/resident.models';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-manage-apartment-add',
  standalone: true,
  imports: [SharedModule, FormsModule], // Add FormsModule here
  templateUrl: './manage-apartment-add.component.html',
  styleUrls: ['./manage-apartment-add.component.scss']
})
export default class SamplePageComponent implements OnInit {
  residents?: Resident[];

  apartment = {
    numberOfApartment: '',
    status: '',
    residentName: ''
  };

  isSubmitted = false; // Flag to control when validation errors are shown

  constructor(
    private apartmentService: ApartmentService,
    private residentService: ResidentService,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.retrieveResidents();
  }

  onSubmit(form: any): void {
    this.isSubmitted = true;

    if (form.valid) {
      this.saveApartment();
    }
  }

  saveApartment(): void {
    const data = {
      numberOfApartment: this.apartment.numberOfApartment,
      status: this.apartment.status,
      residentName: this.apartment.residentName
    };

    this.apartmentService.create(data).subscribe({
      next: (res) => {
        alert('Apartment added successfully!');
        this.apartment = {
          numberOfApartment: '',
          status: '',
          residentName: ''
        };
        this.isSubmitted = false; // Reset form state
        this.router.navigate(['/manage-apartment']); // Navigate to manage-apartment
      },
      error: (e) => {
        alert('Error adding apartment. Please try again.');
        console.error(e);
      }
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
}
