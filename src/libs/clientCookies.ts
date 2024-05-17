export class ClientCookies {
  static get(name: string): string | undefined {
    return this.cookies()[name] || undefined;
  }
  static set(name: string, value: string) {
    
  }

  static cookies() {
    return document.cookie
      .split("; ")
      .reduce((acc, item) => {
        const splited = item.split("=");
        if (splited.length != 2) return acc;

        acc[splited[0]] = splited[1];

        return acc;
      }, {} as Record<string, string>);
  }

  static getToken() {
    return this.get("token");
  }
  static setToken(value: string) {
    this.set("token", value);
  }
}