export class CreateBrainAgricultureDto {
  nome!: string;
  documento!: string;
  nome_fazendo?: string;
  tipo_documento!: string;
  cidade!: string;
  estado!: string;
  area_fazenda!: number;
  area_agricutaravel!: number;
  area_vegetacao!: number;
  plantacoes!: string[];
}
