/**
   * setSendStage
   *
   * @description Metodo para setear el estado de enviado a los archivos
   * @param operation - Informacion de la operacion
   * @param stage - sign Estado de pendiente de firma o send pendiente de envio
   */
  public setStage(stage: 'sign' | 'send', status: string = ''): void {
    const files = this.filesResume.getValue();
    const newFiles = map(files, (x: ITransactionResumen) => {
      x.operationDetail.stage = stage;
      x.operationDetail.status = status;

      return x;
    });
    this.filesResume.next(newFiles);
  }