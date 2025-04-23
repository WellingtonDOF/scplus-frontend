import { Component, OnInit } from '@angular/core';
import { AlunoFormComponent } from '../../components/aluno-form/aluno-form.component';
import { AlunoCreateDTO } from '../../dto/aluno/AlunoCreateDTO';
import { AlunoService } from '../../services/aluno.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [AlunoFormComponent], 
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})

export class CadastroComponent implements OnInit{

  btnAcao = "Cadastrar";
  btnTitulo = "Cadastrar Aluno";
  tipoCadastro: 'aluno' | 'instrutor' = 'aluno';

  constructor(private alunoService: AlunoService, private router: Router, private route : ActivatedRoute) {
  }

  ngOnInit(): void {  
    this.route.queryParams.subscribe(params => {
      this.tipoCadastro = params['tipo'] === 'instrutor' ? 'instrutor' : 'aluno';
    });  

    console.log(this.tipoCadastro)
  }

  createAluno(aluno : AlunoCreateDTO){
    this.alunoService.CreateAluno(aluno).subscribe((data)=>{
      this.router.navigate(['/']);
      console.log(data);
    });
  }

  
}
