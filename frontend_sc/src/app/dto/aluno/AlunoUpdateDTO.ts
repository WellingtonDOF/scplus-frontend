import { PessoaUpdateDTO } from "../pessoa/PessoaUpdateDTO";

export interface AlunoUpdateDTO extends PessoaUpdateDTO{
    categoriaCnhDesejada: string;
}