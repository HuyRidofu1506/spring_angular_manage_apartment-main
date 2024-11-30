// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'manage-resident',
        pathMatch: 'full'
      },
      // {
      //   path: 'dashboard/default',
      //   loadComponent: () => import('./demo/default/dashboard/dashboard.component').then((c) => c.DefaultComponent)
      // },
      {
        path: 'typography',
        loadComponent: () => import('./demo/ui-component/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/ui-component/ui-color/ui-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      },
      {
        path: 'manage-resident',
        loadComponent: () => import('./demo/other/manage-resident/manage-resident.component').then(m => m.ManageResidentComponent)
      },
      {
        path: 'manage-resident-add',
        loadComponent: () => import('./demo/other/manage-resident-add/manage-resident-add.component')
      },
      {
        path: 'manage-resident-edit/:id',
        loadComponent: () => import('./demo/other/manage-resident-edit/manage-resident-edit.component').then(m => m.EditResidentComponent)
      },
      {
        path: 'manage-employee',
        loadComponent: () => import('./demo/other/manage-employee/manage-employee.component').then(m => m.RootComponent)
      },
      {
        path: 'manage-employee-add',
        loadComponent: () => import('./demo/other/manage-employee-add/manage-employee-add.component')
      },
      {
        path: 'manage-employee-edit/:id',
        loadComponent: () => import('./demo/other/manage-employee-edit/manage-employee-edit.component').then(m => m.RootComponent)
      },
      {
        path: 'manage-apartment',
        loadComponent: () => import('./demo/other/manage-apartment/manage-apartment.component')
      },
      {
        path: 'manage-apartment-add',
        loadComponent: () => import('./demo/other/manage-apartment-add/manage-apartment-add.component')
      },
      {
        path: 'manage-apartment-edit/:id',
        loadComponent: () => import('./demo/other/manage-apartment-edit/manage-apartment-edit.component').then(m => m.EditResidentComponent)
      },
      {
        path: 'manage-bill',
        loadComponent: () => import('./demo/other/manage-bill/manage-bill.component').then(m => m.RootComponent)
      },
      {
        path: 'manage-bill-add',
        loadComponent: () => import('./demo/other/manage-bill-add/manage-bill-add.component')
      },
      {
        path: 'manage-bill-edit/:id',
        loadComponent: () => import('./demo/other/manage-bill-edit/manage-bill-edit.component').then(m => m.EditResidentComponent)
      },
      {
        path: 'manage-bill-view/:id',
        loadComponent: () => import('./demo/other/manage-bill-get/manage-bill-get.component').then(m => m.RootComponent)
      },
      {
        path: 'manage-report',
        loadComponent: () => import('./demo/other/manage-report/manage-report.component').then(m => m.RootComponent)
      },
      {
        path: 'manage-report-add',
        loadComponent: () => import('./demo/other/manage-report-add/manage-report-add.component')
      },
      {
        path: 'manage-report-edit/:id',
        loadComponent: () => import('./demo/other/manage-report-edit/manage-report-edit.component').then(m => m.RootComponent)
      },
      {
        path: 'manage-report-view/:id',
        loadComponent: () => import('./demo/other/manage-report-get/manage-report-get.component').then(m => m.RootComponent)
      },
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/authentication/register/register.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
