export class ConfigSearch {
  public static searchConfig(url: string): any {
    return {
      node: url,
      maxRetries: 1,
      requestTimeout: 5000,
      sniffOnStart: true,
    };
  }
}
