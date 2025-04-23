import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlunoCreateDTO } from '../../dto/aluno/AlunoCreateDTO';
import { ActivatedRoute, RouterLink } from '@angular/router'; // Import para verificar a rota
import { AlunoViewModel } from '../../models/AlunoViewModel';
import { format } from 'date-fns'; // Importe a função de formatação
import { AlunoUpdateDTO } from '../../dto/aluno/AlunoUpdateDTO';

/* Angular Material */
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-aluno-form',
  imports: 
  [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule
  
  ],
  templateUrl: './aluno-form.component.html',
  styleUrl: './aluno-form.component.css',
})
export class AlunoFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<AlunoCreateDTO>();
  @Output() onSubmitUpdate = new EventEmitter<AlunoUpdateDTO>();

  @Input() btnAcao!: string
  @Input() btnTitulo!: string
  @Input() dadosAluno: AlunoViewModel | null  = null;

  alunoForm!: FormGroup
  id: number | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.dadosAluno?.dataNascimento);
    let dataNascimento = '';

    if (this.dadosAluno?.dataNascimento) {
      dataNascimento = format(new Date(this.dadosAluno.dataNascimento), 'yyyy-MM-dd');
    }
    
    this.alunoForm = new FormGroup({
        id: new FormControl(this.dadosAluno ? this.dadosAluno.id : 0),
        nomeCompleto: new FormControl(this.dadosAluno ? this.dadosAluno.nomeCompleto : '', [Validators.required]),
        cpf: new FormControl(this.dadosAluno ? this.dadosAluno.cpf : '', [Validators.required]),
        endereco: new FormControl(this.dadosAluno ? this.dadosAluno.endereco : '', [Validators.required]),
        telefone: new FormControl(this.dadosAluno ? this.dadosAluno.telefone : '', [Validators.required, Validators.pattern('^[- +()0-9]+$')]),
        email: new FormControl(this.dadosAluno ? this.dadosAluno.email : '', [Validators.required, Validators.email]),
        dataNascimento: new FormControl(dataNascimento, [Validators.required]), 
        senha: new FormControl(this.dadosAluno ? this.dadosAluno.nomeCompleto : '', [Validators.required]),
        categoriaCnhDesejada: new FormControl(this.dadosAluno ? this.dadosAluno.categoriaCnhDesejada : ''),
        tipoUsuario: new FormControl(this.dadosAluno ? this.dadosAluno.tipoUsuario : ''),
    });

    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id && this.dadosAluno) {
        this.alunoForm.removeControl('cpf');
        this.alunoForm.removeControl('dataNascimento');
        this.alunoForm.removeControl('tipoUsuario');
        this.alunoForm.removeControl('id');
      }
    });
  }

  submit() {
    console.log(this.alunoForm.value)

    if(this.dadosAluno)
      this.onSubmitUpdate.emit(this.alunoForm.value);
    else
      this.onSubmit.emit(this.alunoForm.value)
  }
}
