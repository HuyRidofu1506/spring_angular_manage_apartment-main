// angular import
import { Component, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { Bill } from 'src/app/models/bill.models';
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-manage-bill',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manage-bill.component.html',
  styleUrls: ['./manage-bill.component.scss']
})
export class RootComponent implements OnInit {
  constructor(
    private billService: BillService,
  ) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    const params = this.getRequestParams(this.codeBill, this.page, this.pageSize);

    this.billService.search(params)
      .subscribe({
        next: (response) => {
          this.bills = response.content;
          this.count = response.totalElements;
          console.log("data", response);
        },
        error: (e) => console.error(e)
      });
  }

  deleteResident(id: number) {
    this.billService.delete(id)
      .subscribe({
        next: (res) => {
          this.retrieveTutorials();
        },
        error: (e) => console.error(e)
      });
  }

  bills: Bill[] = [];
  codeBill = '';

  page = 1;
  count = 0;
  pageSize = 5;

  getRequestParams(codeBill: string, page: number, pageSize: number): any {
    let params: any = {};

      params[`codeBill`] = codeBill;

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
