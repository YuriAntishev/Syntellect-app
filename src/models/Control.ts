export default class Control {
  constructor(
    public typeOfInput: string,
    public nameOfInput: string,
    public inputValues: any,
    public setInputValues: any,
    public rightButtons?: any,
    public leftButtons?: any
  ) {}
}
