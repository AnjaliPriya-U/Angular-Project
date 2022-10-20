import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-bookingdetails',
  templateUrl: './bookingdetails.component.html',
  styleUrls: ['./bookingdetails.component.css'],
})
export class BookingdetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'email',
    'phoneNumber',
    'showTimings',
    'date',
    'tickets',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  at: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    public api: BookService,
    private f: FilmService
  ) {}

  ngOnInit(): void {
    this.getAll();

    this.at = this.f.data[this.f.id];
    console.log('at', this.at);
  }

  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAll();
        }
      });
  }

  getAll() {
    this.api.getDetails().subscribe({
      next: (response) => {
        console.log(response);
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('error while fetching data');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editDetails(row: any) {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAll();
        }
      });
  }

  deleteBooking(id: number) {
    this.api.delete(id).subscribe({
      next: (response) => {
        alert('deleted');
        this.getAll();
      },
      error: () => {
        alert('error while fetching data');
      },
    });
  }
}
