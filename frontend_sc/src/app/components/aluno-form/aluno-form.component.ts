import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlunoCreateDTO } from '../../dto/aluno/AlunoCreateDTO';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlunoViewModel } from '../../models/AlunoViewModel';
import { format } from 'date-fns';
import { AlunoUpdateDTO } from '../../dto/aluno/AlunoUpdateDTO';
import { NgxMaskDirective } from 'ngx-mask';

/* Angular Material */
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-aluno-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    NgxMaskDirective,
  ],
  templateUrl: './aluno-form.component.html',
  styleUrl: './aluno-form.component.css',
})
export class AlunoFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<AlunoCreateDTO>();
  @Output() onSubmitUpdate = new EventEmitter<AlunoUpdateDTO>();

  @Input() btnAcao!: string;
  @Input() btnTitulo!: string;
  @Input() dadosAluno: AlunoViewModel | null = null;

  alunoForm!: FormGroup;
  id: number | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    let dataNascimento = '';
    if (this.dadosAluno?.dataNascimento) {
      dataNascimento = format(new Date(this.dadosAluno.dataNascimento), 'yyyy-MM-dd');
    }

    let telefoneFormatado = '';
    if (this.dadosAluno?.telefone) {
      const telefoneNumeros = this.dadosAluno.telefone.replace(/\D/g, '');
      if (telefoneNumeros.length === 10) { // DDD + 8 dígitos
        telefoneFormatado = `(${telefoneNumeros.substring(0, 2)}) ${telefoneNumeros.substring(2, 6)}-${telefoneNumeros.substring(6, 10)}`;
      } else if (telefoneNumeros.length === 11) { // DDD + 9 dígitos
        telefoneFormatado = `(${telefoneNumeros.substring(0, 2)}) ${telefoneNumeros.substring(2, 7)}-${telefoneNumeros.substring(7, 11)}`;
      } else {
        telefoneFormatado = this.dadosAluno.telefone; // Se não corresponder, usa o valor original
      }
    }

    this.alunoForm = new FormGroup({
      id: new FormControl(this.dadosAluno ? this.dadosAluno.id : 0),
      nomeCompleto: new FormControl(this.dadosAluno ? this.dadosAluno.nomeCompleto : '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
      cpf: new FormControl(this.dadosAluno ? this.dadosAluno.cpf : '', [
        Validators.required,
        this.validateCpf
      ]),
      endereco: new FormControl(this.dadosAluno ? this.dadosAluno.endereco : '', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(200)
      ]),
      telefone: new FormControl(telefoneFormatado, [ // Usa o valor formatado
        Validators.required,
        Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)
      ]),
      email: new FormControl(this.dadosAluno ? this.dadosAluno.email : '', [
        Validators.required,
        Validators.email
      ]),
      dataNascimento: new FormControl(dataNascimento, [
        Validators.required,
        this.validateAge
      ]),
      senha: new FormControl(this.dadosAluno ? '' : '', [ // Senha vazia para edição
        this.dadosAluno ? Validators.nullValidator : Validators.required,
        Validators.minLength(6)
      ]),
      categoriaCnhDesejada: new FormControl(this.dadosAluno ? this.dadosAluno.categoriaCnhDesejada : '', [
        Validators.required
      ]),
      tipoUsuario: new FormControl(this.dadosAluno ? this.dadosAluno.tipoUsuario : '', [
        Validators.required
      ]),
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

    this.alunoForm.get('telefone')?.valueChanges.subscribe(value => {
      if (this.alunoForm.get('telefone')?.valid) {
        const telefoneApenasNumeros = value ? value.replace(/\D/g, '') : '';
        // Não atualizar aqui o valor do form para não interferir na validação imediata
      }
    });
  }

  validateCpf(control: FormControl): { [key: string]: any } | null {
    // ... sua lógica de validação de CPF
    return null;
  }

  validateAge(control: FormControl): { [key: string]: any } | null {
    // ... sua lógica de validação de idade
    return null;
  }

  submit() {
    if (this.alunoForm.valid) {
      const telefoneComMascara = this.alunoForm.get('telefone')?.value;
      const telefoneApenasNumeros = telefoneComMascara ? telefoneComMascara.replace(/\D/g, '') : '';

      const formData = { ...this.alunoForm.value, telefone: telefoneApenasNumeros };

      if (this.dadosAluno) {
        this.onSubmitUpdate.emit(formData);
      } else {
        this.onSubmit.emit(formData);
      }
    } else {
      console.log('Formulário inválido!');
    }
  }
}