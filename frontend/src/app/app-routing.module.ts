import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { InvoiceListComponent } from 'src/app/invoice/invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from 'src/app/invoice/invoice-detail/invoice-detail.component';
import { InvoiceFormComponent } from 'src/app/invoice/invoice-form/invoice-form.component';
import { ItemListComponent } from 'src/app/item/item-list/item-list.component';
import { ItemDetailComponent } from 'src/app/item/item-detail/item-detail.component';
import { ItemFormComponent } from 'src/app/item/item-form/item-form.component';
import { 
  AuthGuardService as AuthGuard 
} from 'src/app/_services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent ,canActivate: [AuthGuard]},
  { path: 'invoices', component: InvoiceListComponent ,canActivate: [AuthGuard]},
  { path: 'invoice/create', component: InvoiceFormComponent ,canActivate: [AuthGuard]},
  { path: 'invoice/update/:id', component: InvoiceFormComponent ,canActivate: [AuthGuard]},
  { path: 'invoice/:id', component: InvoiceDetailComponent ,canActivate: [AuthGuard]},
  { path: 'items', component: ItemListComponent ,canActivate: [AuthGuard]},
  { path: 'item/create', component: ItemFormComponent ,canActivate: [AuthGuard]},
  { path: 'item/update/:id', component: ItemFormComponent ,canActivate: [AuthGuard]},
  { path: 'item/:id', component: ItemDetailComponent ,canActivate: [AuthGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
