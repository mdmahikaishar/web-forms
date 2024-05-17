export class Fetcher {
  private baseUrl: string = "";
  private method: string = "GET";
  private url: string = "";
  private data?: string;
  private headers: Record<string, any> = {};


  public constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || "";
  }

  public get(url: string) {    
    this.method = "GET";
    this.url = url;
    return this;
  }
  public post(url: string) {    
    this.method = "POST";
    this.url = url;    
    return this;
  }
  public update(url: string) {    
    this.method = "UPDATE";
    this.url = url;    
    return this;
  }
  public delete(url: string) {    
    this.method = "DELETE";
    this.url = url;    
    return this;
  }
  public put(url: string) {    
    this.method = "PUT";
    this.url = url;    
    return this;
  }

  public header(name: string, value: string | number) {
    this.headers[name] = String(value);
    return this;
  }
  public body(content: any) {
    this.data = JSON.stringify(content);
    this.header("Content-Type", "application/json")
    return this;
  }

  public async exec<T = any>(): Promise<T> {
    const url = this.baseUrl ? `${this.baseUrl}${this.url}`: this.url;

    const result = await fetch(url, {
      method: this.method,
      body: this.data,
      headers: this.headers
    });

    return await result.json() as T;
  }
}