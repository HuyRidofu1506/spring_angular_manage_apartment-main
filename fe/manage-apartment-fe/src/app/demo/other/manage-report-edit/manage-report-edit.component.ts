// angular import
import { Component, Input, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';

import { Report } from 'src/app/models/report.models';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-manage-report-edit',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manage-report-edit.component.html',
  styleUrls: ['./manage-report-edit.component.scss']
})

export class RootComponent implements OnInit {

  constructor(
    private service: ReportService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.getReport(this.route.snapshot.params["id"]);
  }

  @Input() currentData: Report = {
    id: 0,
    name: '',
    date: '',
    content: '',
  };

  getReport(id: string): void {
    this.service.get(id)
      .subscribe({
        next: (data) => {
          this.currentData = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateResident(): void {
    this.service.update(this.currentData.id, this.currentData)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/manage-report']);
        },
        error: (e) => {console.error(e)}
      });
  }
}
