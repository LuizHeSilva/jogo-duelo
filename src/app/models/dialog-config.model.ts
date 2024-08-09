export interface DialogConfigModel {
  tituloDialog: string;
  labelBotaoCancelar?: string;
  labelBotaoFechar?: string;
  confirmacaoFechar?(): Promise<boolean> | boolean;
  confirmacaoCancelar?(): Promise<boolean> | boolean;
  onFechar?(): Promise<boolean> | boolean;
  onCancelar?(): Promise<boolean> | boolean;
  desativarBotaoFechar?(): boolean;
  desativarBotaoCancelar?(): boolean;
  esconderBotaoFechar?(): boolean;
  esconderBotaoCancelar?(): boolean;
}
