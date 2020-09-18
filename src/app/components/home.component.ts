import { Component } from '@angular/core';

@Component({
	selector: 'home',
	templateUrl: '../views/home.html'
})
export class HomeComponent{
	public titulo: string;

	constructor(){
		this.titulo = "Web app de productos con angular";
	}
	ngOnInit(){
		//esta parte controla la respuesta y principalmente asegura que se 
		//carge la pagina pero no esta garantizado.
		console.log("Se ha cargado el componente home.component.ts");
	}
}

