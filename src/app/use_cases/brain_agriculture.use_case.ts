import { BrainAgricultureRepository } from "../repository/brain_agriculture.repository";
import { CreateBrainAgricultureDto } from "../dto/brain_agriculture/create.dto";
import { UpdateBrainAgricultureDto } from "../dto/brain_agriculture/update.dto";

import { validateCPFOrCNPJ } from "../helper/valid_document.helper";
import { paginate } from "../helper/pagination.helper";

export class BrainAgricultureUseCase {
  private brainAgricultureRepository: BrainAgricultureRepository;

  constructor(brainAgricultureRepository: BrainAgricultureRepository) {
    this.brainAgricultureRepository = brainAgricultureRepository;
  }

  create = async (data: CreateBrainAgricultureDto) => {
    const validDocument: { tipo: string; value?: string; valid?: boolean } =
      validateCPFOrCNPJ(data.documento);

    if (validDocument.valid === false)
      return { message: "error: documento invalido", tipo: validDocument.tipo };

    data.tipo_documento = validDocument.tipo;
    const findDocument = await this.brainAgricultureRepository.findByDocument(
      data.documento
    );

    if (findDocument && findDocument.nome_fazenda === data.nome_fazendo)
      throw new Error("Fazenda já registrada");

    const save = await this.brainAgricultureRepository.create(data);
    return save;
  };

  findFarms = async (page: number, quantity: number) => {
    const find = await this.brainAgricultureRepository.findMany(
      page | 1,
      quantity | 10
    );
    const count = await this.brainAgricultureRepository.count();

    const pagination = await paginate(count, page || 1, quantity || 10);

    return {
      data: find.data,
      totalFarms: count,
      totalArea: find.totalArea,
      pagination,
    };
  };

  findFarm = async (id: number) => {
    const find = await this.brainAgricultureRepository.findById(id);

    if (!find) return { message: "error farm not found" };

    return find;
  };

  findFarmDocument = async (
    document: string,
    page: number | 1,
    quantity: number | 10
  ) => {
    const find = await this.brainAgricultureRepository.findByDocuments(
      document,
      page,
      quantity
    );
    const count = await this.brainAgricultureRepository.countByDocument(
      document
    );

    if (!find) return { message: "error farm not found" };

    const pagination = await paginate(count, page || 1, quantity || 10);

    return {
      data: find.data,
      totalFarms: count,
      totalArea: find.totalArea,
      pagination,
    };
  };

  update = async (id: number, data: UpdateBrainAgricultureDto) => {
    const find = await this.brainAgricultureRepository.findById(id);

    if (!find) return { message: "error farm not found" };

    const update = await this.brainAgricultureRepository.update(id, data);

    return update;
  };

  delete = async (id: number) => {
    const find = await this.brainAgricultureRepository.findById(id);

    if (!find) return { message: "error farm not found" };

    const del = await this.brainAgricultureRepository.delete(id);

    return del;
  };
}
