const fs = require("fs").promises;
const path = require("path");

const diretorioBase = __dirname;

const diretorioOrigem = path.join(diretorioBase, "backupsFrom");
const diretorioDestino = path.join(diretorioBase, "backupsTo");
const logOrigemPath = path.join(diretorioBase, "backupsFrom.log");
const logDestinoPath = path.join(diretorioBase, "backupsTo.log");

async function executarAutomacao() {
  console.log(`Iniciando automação na pasta: ${diretorioBase}`);

  try {
    await fs.mkdir(diretorioOrigem, { recursive: true });
    await fs.mkdir(diretorioDestino, { recursive: true });

    const arquivos = await fs.readdir(diretorioOrigem);
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - 3);

    let logOrigemConteudo = `Relatório de arquivos em ${diretorioOrigem} - ${new Date().toISOString()}\n\n`;
    let logDestinoConteudo = `Relatório de arquivos copiados para ${diretorioDestino} - ${new Date().toISOString()}\n\n`;

    if (arquivos.length === 0) {
      console.log("Nenhum arquivo encontrado em backupsFrom para processar.");
      logOrigemConteudo += "Nenhum arquivo encontrado.\n";
    }

    for (const arquivo of arquivos) {
      const caminhoArquivo = path.join(diretorioOrigem, arquivo);
      const stats = await fs.stat(caminhoArquivo);

      if (stats.isFile()) {
        const detalhesArquivo = `
Nome: ${arquivo}
Tamanho: ${stats.size} bytes
Data de Criação: ${stats.birthtime.toISOString()}
Última Modificação: ${stats.mtime.toISOString()}
--------------------------------------------------\n`;
        logOrigemConteudo += detalhesArquivo;

        if (stats.birthtime < dataLimite) {
          await fs.unlink(caminhoArquivo);
          console.log(`Arquivo removido (antigo): ${arquivo}`);
        } else {
          const caminhoDestinoArquivo = path.join(diretorioDestino, arquivo);
          await fs.copyFile(caminhoArquivo, caminhoDestinoArquivo);
          logDestinoConteudo += `Arquivo copiado: ${arquivo}\n`;
          console.log(`Arquivo copiado (recente): ${arquivo}`);
        }
      }
    }

    await fs.writeFile(logOrigemPath, logOrigemConteudo);
    await fs.writeFile(logDestinoPath, logDestinoConteudo);

    console.log("Processo de automação de backups concluído com sucesso!");
  } catch (erro) {
    console.error("Ocorreu um erro durante a execução do script:", erro);
  }
}

executarAutomacao();
