import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { contactComponent } from './components/contact.component';

const routes: Routes = [
  { path: '', component : contactComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ContactRoutingModule {
}
