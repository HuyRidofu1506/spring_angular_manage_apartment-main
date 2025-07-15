// angular import
import { Component, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { ApartmentService } from 'src/app/services/apartment.service';
import { Apartment } from 'src/app/models/apartment.models';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-manage-apartment',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manage-apartment.component.html',
  styleUrls: ['./manage-apartment.component.scss']
})
export default class SamplePageComponent implements OnInit {
  constructor(private apartmentService: ApartmentService) {}

  ngOnInit(): void {
    this.retrieveTutorials();
  }
  formatDate(date: string): string {
    const parsedDate = new Date(date);
    const formattedTime = formatDate(parsedDate, 'HH:mm', 'en-US');
    const formattedDate = formatDate(parsedDate, 'dd/MM/yyyy', 'en-US');
    return `${formattedTime} ${formattedDate}`;
  }

  retrieveTutorials(): void {
    const params = this.getRequestParams(this.residentName, this.page, this.pageSize);

    this.apartmentService.search(params).subscribe({
      next: (response) => {
        this.apartments = response.content;
        this.count = response.totalElements;
        console.log('data', response);
      },
      error: (e) => console.error(e)
    });
  }

  delete(id: number) {
    const confirmed = confirm('Are you sure you want to delete this apartment?'); // Show confirmation dialog
    if (confirmed) {
      this.apartmentService.delete(id).subscribe({
        next: (res) => {
          alert('Apartment deleted successfully!'); // Show success alert
          this.retrieveTutorials(); // Refresh the list of apartments
        },
        error: (e) => {
          alert('Failed to delete the apartment. Please try again.'); // Show error alert
          console.error(e);
        }
      });
    }
  }

  apartments: Apartment[] = [];
  currentIndex = -1;
  residentName = '';

  page = 1;
  count = 0;
  pageSize = 5;

  getRequestParams(residentName: string, page: number, pageSize: number): any {
    let params: any = {};

    params[`resident_name`] = residentName;

    if (page) {
      params[`pageNumber`] = page - 1;
    }

    if (pageSize) {
      params[`pageSize`] = pageSize;
    }

    return params;
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveTutorials();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveTutorials();
  }

  searchTitle(): void {
    this.page = 1;
    this.retrieveTutorials();
  }
}
