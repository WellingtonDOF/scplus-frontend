import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlunoService } from '../../services/aluno.service';
import { AlunoViewModel } from '../../models/AlunoViewModel';

/* Angular Material */
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-detalhes',
  imports: 
  [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css'
})
export class DetalhesComponent implements OnInit {

  constructor(private alunoService : AlunoService, private route : ActivatedRoute, private router : Router) { }

  aluno?: AlunoViewModel;
  id!: number;
  @Input() btnAcao!: string

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.alunoService.GetAluno(this.id).subscribe((data) => {
      const dados = data.dados!;

      dados.dataNascimento = new Date(dados.dataNascimento).toLocaleDateString('pt-BR');

      this.aluno = data.dados!;
      this.atualizarTextoBotao();
      console.log(data);
    });
  }

  atualizarTextoBotao() {
      this.btnAcao = this.aluno?.status === 'Ativo' ? 'Inativar Aluno' : 'Ativar Aluno';
  }

  InativaAluno(){
      this.alunoService.InativaFuncionario(this.id).subscribe((data) => {
        console.log('Resposta do serviço de inativação:', data);
        console.log('Tentando navegar para a rota "/".');
        this.router.navigate(['']);
      });
  }
}
