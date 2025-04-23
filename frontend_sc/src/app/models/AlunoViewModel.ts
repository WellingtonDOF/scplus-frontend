export interface AlunoViewModel{
    id: number;
    nomeCompleto: string; 
    cpf: string;         
    endereco: string;     
    telefone: string;    
    email: string;        
    dataNascimento: string; // ou date
    tipoUsuario: string;  
    status: string;
    categoriaCnhDesejada: string;
    statusPagamento : string;
    statusCurso : string;
}