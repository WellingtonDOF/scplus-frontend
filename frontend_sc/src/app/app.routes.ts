import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { EditarComponent } from './pages/editar/editar.component';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';
import { InstrutorComponent } from './pages/instrutor/instrutor.component';
import { AulaComponent } from './pages/aula/aula/aula.component';
import { DetalhesAulaComponent } from './pages/detalhes/detalhes-aula/detalhes-aula.component';
import { EditarAulaComponent } from './pages/editar/editar-aula/editar-aula.component';
import { MatriculaComponent } from './pages/matricula/matricula.component';
import { CadastroMatriculaComponent } from './pages/cadastro/cadastro-matricula/cadastro-matricula.component';
import { DetalhesMatriculaComponent } from './pages/detalhes/detalhes-matricula/detalhes-matricula.component';
import { EditarMatriculaComponent } from './pages/editar/editar-matricula/editar-matricula.component';
import { VeiculoComponent } from './pages/veiculo/veiculo/veiculo.component';
import { CadastroVeiculoComponent } from './pages/cadastro/cadastro-veiculo/cadastro-veiculo.component';
import { DetalhesVeiculoComponent } from './pages/detalhes/detalhes-veiculo/detalhes-veiculo.component';
import { EditarVeiculoComponent } from './pages/editar/editar-veiculo/editar-veiculo.component';

export const routes: Routes = [
    { path : '', component: HomeComponent},
    //parte de aluno e instrutor
    { path : "instrutor", component: InstrutorComponent},
    { path: "cadastro", component: CadastroComponent },
    { path: "editar/:id", component: EditarComponent },
    { path: "detalhes/:id", component: DetalhesComponent}, 
    //parte de aula
    { path: "aula", component: AulaComponent}, 
    { path: "detalhesaula/:id", component: DetalhesAulaComponent}, 
    { path: "editaraula/:id", component: EditarAulaComponent},
    //parte de matrícula
    { path: "matricula", component: MatriculaComponent}, 
    { path: "cadastro-matricula", component: CadastroMatriculaComponent}, 
    { path: "detalhesmatricula/:id", component: DetalhesMatriculaComponent},
    { path: "editarmatricula/:id", component: EditarMatriculaComponent},
    //parte de veículo
    { path: "veiculo", component: VeiculoComponent}, 
    { path: "cadastro-veiculo", component: CadastroVeiculoComponent}, 
    { path: "detalhesveiculo/:id", component: DetalhesVeiculoComponent},
    { path: "editarveiculo/:id", component: EditarVeiculoComponent},
];
