import { PessoaCreateDTO } from "../pessoa/PessoaCreateDTO";

export interface AlunoCreateDTO extends PessoaCreateDTO{
    categoriaCnh: string;
}