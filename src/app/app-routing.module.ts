import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetListComponent } from './features/pets/pet-list/pet-list.component';
import { PetDetailComponent } from './features/pets/pet-detail/pet-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyReservationsComponent } from './pages/my-reservations/my-reservations.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { ReviewsAllComponent } from './pages/reviews-all/reviews-all.component';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
{ path: 'pets', component: PetListComponent },
  { path: 'pets/:id', component: PetDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'moje-rezervacije', component: MyReservationsComponent },
  { path: 'recenzije', component: ReviewsComponent },
  { path: 'moje-recenzije', component: ReviewsAllComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

