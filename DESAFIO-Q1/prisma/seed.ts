import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

enum Estado {
  ok = "ok",
  alarm = "alarm",
}

async function main() {
  console.log("Start seeding ...");

  await prisma.historicoEstado.deleteMany();
  await prisma.controle.deleteMany();
  await prisma.benchmark.deleteMany();

  const benchmark1 = await prisma.benchmark.create({
    data: { name: "Benchmark de Segurança de APIs" },
  });

  const benchmark2 = await prisma.benchmark.create({
    data: { name: "Benchmark de Performance de Frontend" },
  });

  const controle1_1 = await prisma.controle.create({
    data: {
      name: "C-001: Autenticação Forte",
      description: "Verifica o uso de OAuth 2.0",
      benchmarkId: benchmark1.id,
    },
  });

  const controle1_2 = await prisma.controle.create({
    data: {
      name: "C-002: Validação de Input",
      description: "Garante que todos os inputs são sanitizados",
      benchmarkId: benchmark1.id,
    },
  });

  const controle2_1 = await prisma.controle.create({
    data: {
      name: "P-001: First Contentful Paint (FCP)",
      description: "Mede o tempo até a primeira pintura de conteúdo",
      benchmarkId: benchmark2.id,
    },
  });

  await prisma.historicoEstado.createMany({
    data: [
      {
        controleId: controle1_1.id,
        estado: Estado.ok,
        data_hora: new Date("2025-08-30T10:00:00Z"),
      },
      {
        controleId: controle1_1.id,
        estado: Estado.alarm,
        data_hora: new Date("2025-09-01T14:00:00Z"),
      },
      {
        controleId: controle1_1.id,
        estado: Estado.ok,
        data_hora: new Date("2025-09-02T09:00:00Z"),
      },
      {
        controleId: controle1_2.id,
        estado: Estado.ok,
        data_hora: new Date("2025-09-01T11:00:00Z"),
      },
      {
        controleId: controle2_1.id,
        estado: Estado.alarm,
        data_hora: new Date("2025-08-29T18:00:00Z"),
      },
      {
        controleId: controle2_1.id,
        estado: Estado.alarm,
        data_hora: new Date("2025-09-03T12:00:00Z"),
      },
    ],
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
