// angular import
import { Component, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router } from '@angular/router';

import { Resident } from 'src/app/models/resident.models';
import { ResidentService } from 'src/app/services/resident.service';

@Component({
  selector: 'app-manage-resident',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manage-resident.component.html',
  styleUrls: ['./manage-resident.component.scss']
})
export class ManageResidentComponent implements OnInit {
  constructor(
    private residentService: ResidentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    const params = this.getRequestParams(this.name, this.page, this.pageSize);

    this.residentService.search(params)
      .subscribe({
        next: (response) => {
          this.residents = response.content;
          this.count = response.totalElements;
          console.log("data", response);
        },
        error: (e) => console.error(e)
      });
  }

  deleteResident(id: number) {
    this.residentService.delete(id)
      .subscribe({
        next: (res) => {
          this.retrieveTutorials();
        },
        error: (e) => console.error(e)
      });
  }

  residents: Resident[] = [];
  name = '';

  page = 1;
  count = 0;
  pageSize = 5;

  getRequestParams(name: string, page: number, pageSize: number): any {
    let params: any = {};

      params[`name`] = name;

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
