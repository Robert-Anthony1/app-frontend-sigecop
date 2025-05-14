import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { SolicitudComponent } from './pages/solicitud/solicitud.component';
import { PaginaComponent } from './pages/pagina/pagina.component';
import { RolComponent } from './pages/rol/rol.component';
import { SolicitudProveedorComponent } from './pages/solicitud-proveedor/solicitud-proveedor.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'Home', component: DashboardComponent, children: [
            { path: 'GestionSolicitudCotizacion', component: SolicitudComponent },
            { path: 'Usuarios', component: UsuarioComponent },
            { path: 'Proveedor', component: ProveedorComponent },
            { path: 'Categoria', component: CategoriaComponent },
            { path: 'Producto', component: ProductoComponent },
            { path: 'Pagina', component: PaginaComponent },
            { path: 'Rol', component: RolComponent },
            { path: 'SolicitudProveedor', component: SolicitudProveedorComponent }
        ]
    },
    { path: 'loading', component: LoadingComponent },
    { path: '**', redirectTo: 'Home', pathMatch: 'full' },


];
