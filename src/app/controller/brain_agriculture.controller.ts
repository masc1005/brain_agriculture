import { Request, Response } from "express";
import { CreateBrainAgricultureDto } from "../dto/brain_agriculture/create.dto";
import { UpdateBrainAgricultureDto } from "../dto/brain_agriculture/update.dto";
import { BrainAgricultureUseCase } from "../use_cases/brain_agriculture.use_case";

export class BrainAgricultureController {
  private brainAgricultureUseCase: BrainAgricultureUseCase;

  constructor(brainAgricultureUseCase: BrainAgricultureUseCase) {
    this.brainAgricultureUseCase = brainAgricultureUseCase;
  }

  create = async (request: Request, response: Response) => {
    const data: CreateBrainAgricultureDto = request.body;
    try {
      const result = await this.brainAgricultureUseCase.create(data);
      return response.status(201).json(result);
    } catch (error) {
      const message =
        (error as { message?: string }).message || "Unknown error";
      return response.status(500).json({ error: message });
    }
  };

  findFarms = async (request: Request, response: Response) => {
    const { page, quantity } = request.query;
    try {
      const farms = await this.brainAgricultureUseCase.findFarms(
        parseInt(page as string),
        parseInt(quantity as string)
      );
      return response.json(farms);
    } catch (error) {
      const message =
        (error as { message?: string }).message || "Unknown error";
      return response.status(500).json({ error: message });
    }
  };

  findFarm = async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
      const farm = await this.brainAgricultureUseCase.findFarm(parseInt(id));
      if (!farm) {
        return response.status(404).json({ message: "Farm not found" });
      }
      return response.json(farm);
    } catch (error) {
      const message =
        (error as { message?: string }).message || "Unknown error";
      return response.status(500).json({ error: message });
    }
  };

  findFarmDocument = async (request: Request, response: Response) => {
    const { document } = request.query;
    const { page, quantity } = request.query;
    try {
      const farm = await this.brainAgricultureUseCase.findFarmDocument(
        JSON.stringify(document),
        parseInt(page as string),
        parseInt(quantity as string)
      );
      if (!farm) {
        return response.status(404).json({ message: "Farm not found" });
      }
      return response.json(farm);
    } catch (error) {
      const message =
        (error as { message?: string }).message || "Unknown error";
      return response.status(500).json({ error: message });
    }
  };

  update = async (request: Request, response: Response) => {
    const { id } = request.params;
    const data: UpdateBrainAgricultureDto = request.body;
    try {
      const updatedFarm = await this.brainAgricultureUseCase.update(
        parseInt(id),
        data
      );
      return response.json(updatedFarm);
    } catch (error) {
      const message =
        (error as { message?: string }).message || "Unknown error";
      return response.status(500).json({ error: message });
    }
  };

  delete = async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
      await this.brainAgricultureUseCase.delete(parseInt(id));
      return response.status(204).send();
    } catch (error) {
      const message =
        (error as { message?: string }).message || "Unknown error";
      return response.status(500).json({ error: message });
    }
  };
}
