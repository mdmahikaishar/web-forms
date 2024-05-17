interface ITokenPayload {
  userId: any
}

interface ITokenValidation extends ITokenPayload {

}

export class Token {
  static generate(payload: ITokenPayload): string {
    return `TOKEN-${payload.userId}`
  }
  static validate(token?: string | null): ITokenValidation | undefined {
    if (!token) return undefined;

    const value = token.replace("TOKEN-", "");
    if (!value) return undefined;

    return { userId: value };
  }

}