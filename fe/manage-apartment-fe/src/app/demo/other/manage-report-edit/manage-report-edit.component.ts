import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Report } from 'src/app/models/report.models';
import { ReportService } from 'src/app/services/report.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-manage-report-edit',
  standalone: true,
  imports: [SharedModule, FormsModule], 
  templateUrl: './manage-report-edit.component.html',
  styleUrls: ['./manage-report-edit.component.scss']
})
export class RootComponent implements OnInit {
  @Input() currentData: Report = {
    id: 0,
    name: '',
    date: '',
    content: ''
  };

  isSubmitted = false;

  constructor(
    private service: ReportService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getReport(this.route.snapshot.params['id']);
  }

  getReport(id: string): void {
    this.service.get(id).subscribe({
      next: (data) => {
        this.currentData = data;
      },
      error: (e) => console.error(e)
    });
  }

  onSubmit(form: any): void {
    this.isSubmitted = true;

    if (form.valid) {
      this.updateResident();
    }
  }

  updateResident(): void {
    this.service.update(this.currentData.id, this.currentData).subscribe({
      next: (res) => {
        alert('Report updated successfully!');
        this.router.navigate(['/manage-report']);
      },
      error: (e) => {
        alert('Failed to update report. Please try again.');
        console.error(e);
      }
    });
  }
}
