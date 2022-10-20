import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { FilmService } from 'src/app/services/film.service';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  bookingForm!: FormGroup;
  action: String = 'Book';
  a: Number = 0;
  id: any = this.r.snapshot.paramMap.get('id')!;
  at: number = 0;
  data: any;
  index: any;

  constructor(
    private api: BookService,
    private fb: FormBuilder,
    private ref: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public edit: any,
    private f: FilmService,
    private r: ActivatedRoute,
    private s: MovieService
  ) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      showTimings: ['', Validators.required],
      date: ['', Validators.required],
      tickets: ['', Validators.required],
    });

    console.log('id', this.f.id); 
    console.log('tickets', this.f.data[this.f.id]);

    this.at = this.f.data[this.f.id];
    console.log('at', this.at);
    console.log(this.f.data);

    if (this.edit) {
      this.action = 'Update';
      this.bookingForm.controls['name'].setValue(this.edit.name);
      this.bookingForm.controls['email'].setValue(this.edit.email);
      this.bookingForm.controls['phoneNumber'].setValue(this.edit.phoneNumber);
      this.bookingForm.controls['showTimings'].setValue(this.edit.showTimings);
      this.bookingForm.controls['date'].setValue(this.edit.date);
      this.bookingForm.controls['tickets'].setValue(this.edit.tickets);
    }
  }

  addUser() {
    if (!this.edit) {
      if (this.bookingForm.valid) {
        // console.log("id", Number(this.f.id),Number(this.bookingForm.value.tickets));
        // console.log('data',this.data)
        this.f.updateFilm(
          Number(this.f.id),
          Number(this.bookingForm.value.tickets)
        );

        this.api.postDetails(this.bookingForm.value).subscribe({
          next: (response) => {
            alert('booking is successful');
            this.bookingForm.reset();
            this.ref.close();
          },
          error: () => {
            alert('booking is not successful');
          },
        });
      }
      console.log(this.bookingForm.value);
    } else {
      this.update();
    }
  }

  update() {
    this.api.putInfo(this.bookingForm.value, this.edit.id).subscribe({
      next: (res) => {
        alert('sucessfully updated');
        this.bookingForm.reset();
        this.ref.close();
      },
    });
  }
}

