export interface Paciente {
    id?: number;
    nome?: string;
    sexo?: string;
    dataNascimento?: string;
    // dataAdmissao?: string;
    numeroDoGal?: string;
    dataDaColetaCovid?:string;
    amostra?: string;
    localDeColetaCovid?: string;
    statusCovid?: string;
    municipioDeOrigem?: string;
    statusInfluenza?: string;
    vacina?: string;
    comorbidade?: string;
    tr?:boolean;
    dataColetaTr?: string;
    localColetaTr?: string;
    statusTr?: string
    dataCadastro?: string;
    ativo?: boolean;
    
}