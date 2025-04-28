import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { EditarComponent } from './pages/editar/editar.component';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';
import { InstrutorComponent } from './pages/instrutor/instrutor.component';

export const routes: Routes = [
    { path : '', component: HomeComponent},
    {path : "instrutor", component: InstrutorComponent},
    { path: "cadastro", component: CadastroComponent },
    { path: "editar/:id", component: EditarComponent },
    { path: "detalhes/:id", component: DetalhesComponent}, 
];
