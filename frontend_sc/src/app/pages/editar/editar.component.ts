import { Component, OnInit } from '@angular/core';
import { AlunoFormComponent } from '../../components/aluno-form/aluno-form.component';
import { AlunoCreateDTO } from '../../dto/aluno/AlunoCreateDTO';
import { AlunoService } from '../../services/aluno.service';
import { AlunoViewModel } from '../../models/AlunoViewModel';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoUpdateDTO } from '../../dto/aluno/AlunoUpdateDTO';

@Component({
  selector: 'app-editar',
  imports: [AlunoFormComponent],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit{
  btnAcao: string = 'Editar';
  btnTitulo: string = 'Editar Aluno';
  btnEditar: boolean = true;
  aluno!: AlunoViewModel;

  constructor(private alunoService: AlunoService, private route : ActivatedRoute, private router : Router) { }
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.alunoService.GetAluno(id).subscribe((data) =>{
      this.aluno = data.dados!;
    })
  }
  
  editarAluno(aluno: AlunoUpdateDTO) {

    console.log(aluno);
    this.alunoService.EditarAluno(this.aluno.id, aluno).subscribe((data) => {
      console.log(data);
      this.router.navigate(['']);
    });
  }

}
