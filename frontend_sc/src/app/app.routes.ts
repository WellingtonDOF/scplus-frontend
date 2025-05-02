import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { EditarComponent } from './pages/editar/editar.component';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';
import { InstrutorComponent } from './pages/instrutor/instrutor.component';
import { AulaComponent } from './pages/aula/aula/aula.component';
import { DetalhesAulaComponent } from './pages/detalhes/detalhes-aula/detalhes-aula.component';
import { EditarAulaComponent } from './pages/editar/editar-aula/editar-aula.component';

export const routes: Routes = [
    { path : '', component: HomeComponent},
    { path : "instrutor", component: InstrutorComponent},
    { path: "cadastro", component: CadastroComponent },
    { path: "editar/:id", component: EditarComponent },
    { path: "detalhes/:id", component: DetalhesComponent}, 
    { path: "aula", component: AulaComponent}, 
    { path: "detalhesaula/:id", component: DetalhesAulaComponent}, 
    { path: "editaraula/:id", component: EditarAulaComponent}
];
