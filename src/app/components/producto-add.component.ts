import { Component } from '@angular/core' ;
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/map';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { GLOBAL } from '../services/global';
import { HttpClient } from '@angular/common/http';

@Component({ //permite definir los metadatos, parametros y configuraciones basicas
	selector: 'producto-add',
	templateUrl: '../views/producto-add.html',
	providers: [ProductoService]
	})
export class ProductoAddComponent{
	public titulo: string;
	//Con esto inicio la recolección de datos a la BD
	public producto: Producto;

	constructor(
		private http: HttpClient,
		private _productoService: ProductoService,
		private _route: ActivatedRoute,
		private _router: Router 
		){
		/*this.titulo='Crear un nuevo producto';
		this.producto = new Producto(0,'','',0,'');//esta parte es una*/
		//instancia vacia de esto lo vinculo al HTML de producto-add.
	}
	ngOnInit(){
		console.log('producto-add.component.ts cargando-.-.');
	}
	onSubmit(){				
		console.log(this.producto);

		this._productoService.makeFileRequest(GLOBAL.url+"upload-file", [], this.filesToUpload).
		then((result) =>{
			console.log(result);
		}, error=>{
			console.log(error);
		});

		this._productoService.addProducto(this.producto).subscribe(
			response=>{
				if(response.code==200){
					this._router.navigate(['/crear-producto']);
				}else{
					console.log(response);
				}
			}, error=>{
				console.log(<any>error);
			}
		);
	}
	public filesToUpload;
	public resultUpload;

	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
		//Toma los ficheros que le damos y los sube a un array de tipo File.
		console.log(this.filesToUpload);
	}	



	selectedFile: File = null;
	onFileSelected(event){
		this.selectedFile = <File>event.target.files[0];
	}	
	onUpload(){
		const fd = new FormData();
		fd.append('image', this.selectedFile);
		this.http.post('http://localhost/Programas/curso_angular4_backend/index.php/upload-file', fd).subscribe(res => {
				console.log(res);
		});
	}
}