export enum ErrorCode {
  GAMEUPDATING = 'EFPLGAMEUPDATING',
  NOTFOUND= 'EFPLREQUESTNOTFOUND',
  NORESPONSE= 'EFPLNORESPONSE',
}

export enum ErrorMessage {
  GAMEUPDATING = 'The FPL game is being updated.',
  NOTFOUND= 'FPL did not return the required response - please check params are valid.',
  NORESPONSE= 'No response received from FPL',
}

export class CustomError extends Error {
  public code: string;
  constructor(message, code) {
    super(message);
    this.stack = '';
    this.code = code;
  }
}
