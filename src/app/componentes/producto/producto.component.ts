import { Component, OnInit, ViewChild } from '@angular/core';
import { producto } from '../../modelo/producto';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ApiProductoService } from '../../servicios/api-producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['../../estilos/angular-material.css']
})
export class ProductoComponent implements OnInit {

  displayedColums: String[] = ['nombre','categoria','descripcion','precio','entrada','salida','estado','editar','eliminar'];
  modelo: producto[];
  dataSource;

  @ViewChild(MatPaginator, {static : true}) paginacion: MatPaginator;

  constructor(
    private _api: ApiProductoService
  ) { }

  ngOnInit() {
    this._api.Get().subscribe(response => {
      this.modelo = response.modelo;
      this.dataSource = new MatTableDataSource<producto>(this.modelo);
      this.dataSource.paginator = this.paginacion;
      
    },
    error => {
      console.log(<any>error);
    })
  }

}
