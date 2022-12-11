import { SetorEditComponent } from './../setor-edit/setor-edit.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Setor } from './../localInternacao.model';
import { MatDialog } from '@angular/material/dialog';
import { SetorService } from './../setor.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-setor-read',
  templateUrl: './setor-read.component.html',
  styleUrls: ['./setor-read.component.css']
})
export class SetorReadComponent implements OnInit {

  setores: Setor[] = [];
  displayedColumns: string[] = ['registro', 'nome', 'ativo', 'dataCadastro', 'action'];
  dataSource = new MatTableDataSource<Setor>(this.setores);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataFromDialog : any;
  dialogId!: number;

  constructor(
    private router: Router,
    private service: SetorService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll():void {
    this.service.buscarTodos().subscribe((resposta) => {
      this.setores = resposta;
      this.dataSource = new MatTableDataSource<Setor>(this.setores);
      this.dataSource.paginator = this.paginator;
      console.log(this.setores);
    })
  }

  navigateToCreate(){
    this.router.navigate(['setor-create']);
  }

  showPrompt(id: number): void {
    this.dialogId = id;
    const dialogRef = this.dialog.open(SetorEditComponent,
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
