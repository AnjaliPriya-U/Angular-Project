import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { BookingdetailsComponent } from './components/bookingdetails/bookingdetails.component';
import { HomeComponent } from './components/home/home.component';
import { MovieComponent } from './components/movie/movie.component';
import { MoviedetailsComponent } from './components/moviedetails/moviedetails.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'nav', component: NavbarComponent },
  { path: 'home', component: HomeComponent },
  { path: 'movies', component: MovieComponent },
  { path: 'movie/:id', component: MoviedetailsComponent },
  { path: 'book/:id', component: BookComponent },
  { path: 'bookingdetails', component: BookingdetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
