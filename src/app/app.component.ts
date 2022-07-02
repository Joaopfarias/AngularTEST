import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  nome: string;
  position: number;
  telefone: number;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'nome', 'telefone'];
  data:any = [];
  position:number = 0;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  formTeste: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    telefone: ['', Validators.required]
  })
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PeriodicElement>;
  constructor(private fb: FormBuilder) { }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add() {
    if (this.formTeste.valid) {
      this.data.push({
        position: this.position++,
        nome: this.formTeste.value.nome,
        telefone: this.formTeste.value.telefone
      });
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.data);
      this.dataSource.sort = this.sort;
    }
  }
  removeData() {
    this.dataSource.data.pop();
    this.dataSource.sort = this.sort;
  }
}
