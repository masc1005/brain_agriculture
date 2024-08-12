import { PrismaClient } from "@prisma/client";
import { CreateBrainAgricultureDto } from "../dto/brain_agriculture/create.dto";
import { UpdateBrainAgricultureDto } from "../dto/brain_agriculture/update.dto";

export class BrainAgricultureRepository {
  private repository: PrismaClient;

  constructor(repository: PrismaClient) {
    this.repository = repository;
  }

  findMany = async (page: number, quantity: number) => {
    const [find, aggregateResult] = await this.repository.$transaction([
      this.repository.brainAgriculture.findMany({
        skip: (page - 1) * quantity,
        take: quantity,
      }),
      this.repository.brainAgriculture.aggregate({
        _sum: {
          area_fazenda: true,
        },
      }),
    ]);

    return {
      data: find,
      totalArea: aggregateResult._sum.area_fazenda || 0,
    };
  };

  count = async () => {
    const find = await this.repository.brainAgriculture.count({});
    return find;
  };

  countByDocument = async (documento: string) => {
    let doc = documento.replace(/[^\d]+/g, "");
    const count = await this.repository.brainAgriculture.count({
      where: {
        documento: doc,
      },
    });

    return count;
  };

  findById = async (id: number) => {
    const find = await this.repository.brainAgriculture.findFirst({
      where: {
        id,
      },
    });

    return find;
  };

  findByName = async (nome: string) => {
    const find = await this.repository.brainAgriculture.findFirst({
      where: {
        nome,
      },
    });

    return find;
  };

  findByDocument = async (documento: string) => {
    let doc = documento.replace(/[^\d]+/g, "");
    const find = await this.repository.brainAgriculture.findFirst({
      where: {
        documento: doc,
      },
    });

    return find;
  };

  findByDocuments = async (
    documento: string,
    page: number | 1,
    quantity: number | 10
  ) => {
    let doc = documento.replace(/[^\d]+/g, "");
    const [find, aggregateResult] = await this.repository.$transaction([
      this.repository.brainAgriculture.findMany({
        where: {
          documento: doc,
        },
        skip: (page - 1) * quantity,
        take: quantity,
      }),
      this.repository.brainAgriculture.aggregate({
        where: {
          documento: doc,
        },
        _sum: {
          area_fazenda: true,
        },
      }),
    ]);

    return {
      data: find,
      totalArea: aggregateResult._sum.area_fazenda || 0,
    };
  };

  create = async (data: CreateBrainAgricultureDto) => {
    let documento = data.documento.replace(/[^\d]+/g, "");
    const create = await this.repository.brainAgriculture.create({
      data: {
        ...data,
        documento,
      },
    });

    return create;
  };

  update = async (id: number, data: UpdateBrainAgricultureDto) => {
    const update = await this.repository.brainAgriculture.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return update;
  };

  delete = async (id: number) => {
    const del = await this.repository.brainAgriculture.delete({
      where: {
        id,
      },
    });

    return del;
  };
}
