import { PessoaResponseDTO } from "../pessoa/PessoaResponseDTO";

export interface AlunoResponseDTO extends PessoaResponseDTO{
    categoriaCnh: string;
    statusPagamento : string;
    statusCurso : string;
}