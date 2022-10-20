import { Component, OnInit, Inject } from '@angular/core';  
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { AfterViewInit, ViewChild } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router';
import { FilmService } from 'src/app/services/film.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit { 

  displayedColumns: string[] = ['name', 'email', 'phoneNumber','showTimings','date','tickets','action']; 
  dataSource!: MatTableDataSource<any>;
  movie:any = this.r.snapshot.paramMap.get('id')!; 
  moviename:string=''

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,
    public api: BookService,
    private r:ActivatedRoute,
    private f:FilmService,
    private s:MovieService) { }

  ngOnInit(): void {
    this.getAll()
    let id =parseInt(this.r.snapshot.paramMap.get('id')+'' )
    this.f.setId(parseInt(id+""))

    this.getDetails()
    console.log(this.f.id)
  }
  
  getDetails():void{ 
    this.s.getCapitalMovieDetail(this.movie)
    .subscribe((data:any)=>{ 
      this.moviename=data.title
      console.log('m',data.title)  
    }) 
  }

  openDialog() {
    this.dialog.open(DialogComponent, { 
        width:'30%'  
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAll()
      }
    })
  }

  getAll(){
    this.api.getDetails()
    .subscribe({
      next:(response)=>{
        console.log(response)
        this.dataSource=new MatTableDataSource(response) 
        this.dataSource.paginator=this.paginator
        this.dataSource.sort=this.sort
      },
      error:(err)=>{
        alert('error while fetching data')
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editDetails(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAll()
      }
    })
    
  }

  deleteBooking(id:number){
    this.api.delete(id)
    .subscribe({
      next:(response)=>{
        alert('deleted')
        this.getAll()
      },
      error:()=>{
        alert('error while fetching data')
      }
    }) 
  }

}

 