import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';

@Component({
	selector:'productos-list',
	templateUrl: '../views/productos-list.html',
	providers: [ ProductoService ]//no poner esto en comillas generará error
})

export class ProductosListComponent{
	public titulo: string;
	public  productos: Producto[];

	constructor//servicios privados para el router
	(
		private _route: ActivatedRoute,
		private _router: Router,
		private _productoService: ProductoService
	){
		this.titulo='Listado de productos';
	}
	ngOnInit(){
		console.log('Productos-list.component.ts cargado');

		this._productoService.getProductos().subscribe(
			result =>{
				
				//data es una propiedad, simplemente la referenciamos
				//para que nos diga un conjunto de valores especificos
				if(result.code != 505){
					console.log(result);
				}else{
					//Tengo un array de objetos con todos los objetos guardados
					//en la base de datos
					this.productos = result.data;
				}
				},error=>{
					console.log(<any>error);
				}
		);
	}	
}