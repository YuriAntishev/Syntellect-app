export default class Control {
  constructor(
    public typeOfInput: string,
    public nameOfInput: string,
    public inputValues: any,
    public setInputValues: any,
    public maxTips?: number,
    public rightButtons?: any,
    public leftButtons?: any
  ) {}
}
