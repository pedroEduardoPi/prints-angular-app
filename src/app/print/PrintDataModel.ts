export interface PrintData {
  login: string | null;
  dominio: string | null;
  nome: string | null;
  centroCusto: string | null;

  nomeDispositivo: string | null;
  modeloDispositivo: string | null;
  serialDispositivo: string | null;
  enderecoDispositivo: string | null;

  departamentoDispositivo: string | null;

  computadorOrigem: string | null;

  servidorImpressao: string | null;
  enderecoServidor: string | null;
  servidorOs: string | null;

  filaImpressao: string | null;
  driverImpressao: string | null;
  portName: string | null;

  tipoTrabalho: string | null;
  confianca: string | null;

  documentoNome: string | null;
  aplicativoImpressao: string | null;

  dataImpressao: string | null;

  papel: string | null;
  resolucao: number | null;
  duplex: number | null;

  paginasOriginais: number | null;
  copias: number | null;

  totalPaginasCor: number | null;
  totalPaginasMono: number | null;
  totalImpresso: number | null;

  custo: number | null;
}