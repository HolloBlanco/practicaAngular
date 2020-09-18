import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//componente
import { HomeComponent } from './components/home.component';
import { ErrorComponent } from './components/error.component';
import { ProductosListComponent } from './components/productos-list.component';
import { ProductoAddComponent } from './components/producto-add.component';

const appRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'productos', component: ProductosListComponent },
	{ path: 'crear-producto', component: ProductoAddComponent},
	{ path: '**', component: ErrorComponent }
];
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders <any>= RouterModule.forRoot(appRoutes);
//llamamos al objeto RouterModule y forRoot para recibir rutas y 
//establecer la configuación de rutas.