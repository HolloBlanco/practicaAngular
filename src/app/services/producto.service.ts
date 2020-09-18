import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { GLOBAL } from './global';

@Injectable()

export class ProductoService{
	public url: string;

	constructor(
		public _http: Http
	){
		this.url = GLOBAL.url;
	}
	getProductos(){
		//Aquí estoy pidiendo una petición a Json comvierto pido 
		//una url, mapeo la respuesta y pido que la comvierta a 
		//javascript para que luego me devuelva una resputes
		return this._http.get(this.url+'productos').map(res => res.json());
	}
	//El siguiente metodo nos permitira crear los productos a la base de datos
	addProducto(producto:Producto){
		let json = JSON.stringify(producto);//objeto producto crea una variable 
		//comvertida a un objeto JSON.
		let params = 'json='+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		//Con esto la aplicación procesa la información por post
		return this._http.post(this.url+'productos', params, {headers:headers}).
		map(res=> res.json());
	}

	makeFileRequest(url:string, params: Array<string>, files:Array<File>){
		return new Promise((resolve, reject)=>{
			var formData: any = new FormData();
			var xhr = new XMLHttpRequest();
			//Esto nos deja disponible el objeto para hacer peticiones AJAX
			for(var i =0 ; i < files.length ; i++ ){
				formData.append('uploads[]', files[i], files[i].name);
				//nombre del array, toma todo el fichero y toma el nombre del archivo
			}
			xhr.onreadystatechange= function(){
				if(xhr.readyState == 4){
					if(xhr.status==200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}
				}
			};
			xhr.open("POST", url, true);//indicamos el metodo y url que requrimos
			xhr.send(formData);
		});
	}

}