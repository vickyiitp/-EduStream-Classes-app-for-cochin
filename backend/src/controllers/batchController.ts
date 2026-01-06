
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllBatches = async (req: Request, res: Response) => {
  try {
    const batches = await prisma.batch.findMany();
    res.json(batches);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch batches' });
  }
};

export const createBatch = async (req: Request, res: Response) => {
  const { name, subject, price, image, isNew, isPopular, class: grade, examType, language } = req.body;
  try {
    const batch = await prisma.batch.create({
      data: {
        name,
        subject,
        price,
        image,
        isNew: !!isNew,
        isPopular: !!isPopular,
        class: grade,
        examType,
        language,
        progress: 0
      }
    });
    res.status(201).json(batch);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create batch' });
  }
};

export const updateBatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const batch = await prisma.batch.update({
      where: { id },
      data
    });
    res.json(batch);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update batch' });
  }
};

export const deleteBatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.batch.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete batch' });
  }
};
