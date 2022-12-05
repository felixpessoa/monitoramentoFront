import { AltaEditComponent } from './../alta-edit/alta-edit.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Alta } from './../alta.model';
import { AltaService } from './../alta.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-alta-read',
  templateUrl: './alta-read.component.html',
  styleUrls: ['./alta-read.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AltaReadComponent implements OnInit {

  altas: Alta[] = [];
  columnsToDisplay = ['id', 'nome', 'dataDaColetaCovid', 'statusCovid', 'action'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement?: Alta | null;
  dataSource = new MatTableDataSource<Alta>(this.altas);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataFromDialog : any;
  dialogId!: number;

  constructor(
    private router: Router,
    private service: AltaService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.buscarTodos().subscribe({
      next: (res) => {
        this.altas = res;
        this.dataSource = new MatTableDataSource<Alta>(this.altas);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  navigateToCreate(){
    this.router.navigate(['alta-create']);
  }

  showPrompt(id: number): void {
    this.dialogId = id;
    const dialogRef = this.dialog.open(AltaEditComponent,
      { width: '1500px',
       height: '400px',
       data: {dialogoId: this.dialogId} 
      });

    dialogRef.afterClosed()
    .subscribe((shouldReload: boolean) => {
      if (shouldReload) window.location.reload()
    });
  }

}
