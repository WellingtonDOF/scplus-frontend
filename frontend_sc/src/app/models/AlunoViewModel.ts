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
    observacao: string;
    statusPagamento : string;
    statusCurso : string;
}