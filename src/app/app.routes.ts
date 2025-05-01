import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoadingComponent } from './pages/loading/loading.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'home', component: DashboardComponent, children: [
            { path: 'GestionSolicitudCotizacion', component: LoadingComponent },
            { path: 'Usuarios', component: LoadingComponent }
        ]
    },
    { path: 'loading', component: LoadingComponent },


];
