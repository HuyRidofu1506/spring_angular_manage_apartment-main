import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResidentService } from 'src/app/services/resident.service';
import { Resident } from 'src/app/models/resident.models';
import { Apartment } from 'src/app/models/apartment.models';
import { ApartmentService } from 'src/app/services/apartment.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-apartment-edit',
  standalone: true,
  imports: [SharedModule, FormsModule],
  templateUrl: './manage-apartment-edit.component.html',
  styleUrls: ['./manage-apartment-edit.component.scss']
})
export class EditResidentComponent implements OnInit {
  residents?: Resident[];

  @Input() currentApartment: Apartment = {
    id: 0,
    numberOfApartment: 0,
    status: '',
    residentName: ''
  };

  isSubmitted = false;

  constructor(
    private residentService: ResidentService,
    private apartmentService: ApartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.get(this.route.snapshot.params['id']);
    this.retrieveResidents();
  }

  get(id: string): void {
    this.apartmentService.get(id).subscribe({
      next: (data) => {
        this.currentApartment = data;
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
    this.apartmentService.update(this.currentApartment.id, this.currentApartment).subscribe({
      next: (res) => {
        alert('Apartment updated successfully!');
        this.router.navigate(['/manage-apartment']);
      },
      error: (e) => {
        alert('Error updating apartments. Please try again.');
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
