import { trigger, state, style, transition, animate } from '@angular/animations';
import { ObitoEditComponent } from './../obito-edit/obito-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Obito } from './../obito.mode';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ObitoService } from '../obito.service';

@Component({
  selector: 'app-obito-read',
  templateUrl: './obito-read.component.html',
  styleUrls: ['./obito-read.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ObitoReadComponent implements OnInit {

  obitos: Obito[] = [];
  columnsToDisplay = ['id', 'nome', 'dataDaColetaCovid', 'statusCovid', 'action'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement?: Obito | null;
  dataSource = new MatTableDataSource<Obito>(this.obitos);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataFromDialog : any;
  dialogId!: number;

  constructor(
    private router: Router,
    private service: ObitoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.buscarTodos().subscribe({
      next: (res) => {
        this.obitos = res;
        this.dataSource = new MatTableDataSource<Obito>(this.obitos);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  navigateToCreate(){
    this.router.navigate(['obito-create']);
  }

  showPrompt(id: number): void {
    this.dialogId = id;
    const dialogRef = this.dialog.open(ObitoEditComponent,
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
