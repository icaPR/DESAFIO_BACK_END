import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getBenchmarksWithCurrentState = async (
  req: Request,
  res: Response
) => {
  try {
    const benchmarks = await prisma.benchmark.findMany({
      include: {
        controles: {
          include: {
            historicoEstado: {
              orderBy: {
                data_hora: "desc",
              },
              take: 1,
            },
          },
        },
      },
    });
    res.json(benchmarks);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar benchmarks" });
  }
};

export const getBenchmarksHistoryInRange = async (
  req: Request,
  res: Response
) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ error: "startDate e endDate são obrigatórios" });
  }

  try {
    const benchmarks = await prisma.benchmark.findMany({
      include: {
        controles: {
          include: {
            historicoEstado: {
              where: {
                data_hora: {
                  gte: new Date(startDate as string),
                  lte: new Date(endDate as string),
                },
              },
              orderBy: {
                data_hora: "asc",
              },
            },
          },
        },
      },
    });
    res.json(benchmarks);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar histórico de benchmarks" });
  }
};

export const getBenchmarksStateAtTime = async (req: Request, res: Response) => {
  const { atDate } = req.query;

  if (!atDate) {
    return res.status(400).json({ error: "atDate é obrigatório" });
  }

  try {
    const benchmarks = await prisma.benchmark.findMany({
      include: {
        controles: {
          include: {
            historicoEstado: {
              where: {
                data_hora: {
                  lte: new Date(atDate as string),
                },
              },
              orderBy: {
                data_hora: "desc",
              },
              take: 1,
            },
          },
        },
      },
    });
    res.json(benchmarks);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar estado do benchmark em data específica" });
  }
};
