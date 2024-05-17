export class Bool {
  static fromStr(value: string): boolean {
    return value === "true" ? true : false;
  }
}

export class NameGen {
  static fromName(name: string): string {
    return name.replace(" ", "_");
  }
  static fromOption(name: string, option: string): string {
    return NameGen.fromName(name) + "-" + NameGen.fromName(option);
  }
}

export class TypedInputData {

}