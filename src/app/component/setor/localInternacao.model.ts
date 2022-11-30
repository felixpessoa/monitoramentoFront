import { Internacao } from './../internamento/internamento.model';
export interface Setor {
   id?: number,
   nome?: string,
   ativo?: boolean,
   dataCadastro?: string,
   internacao?: Internacao[], 
}