import { PessoaResponseDTO } from "../pessoa/PessoaResponseDTO";

export interface AlunoResponseDTO extends PessoaResponseDTO{
    categoriaCnhDesejada: string;
    statusPagamento : string;
    statusCurso : string;
}