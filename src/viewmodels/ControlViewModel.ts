import { makeObservable, observable } from "mobx";
import PromiseAwareViewModelBase from "./PromiseAwareViewModelBase";
// import TodoService from '../services/TodoService';
import Control from "../models/Control";
import { getCountries } from "../api/apiService";

interface ServerResponseInterface<T> {
  didFail: boolean;
  failReason?: string;
  data?: T;
}

export default class ButtonViewModel extends PromiseAwareViewModelBase {
  constructor(
    // private service: TodoService,
    model: Control
  ) {
    super();
    makeObservable(this);
    this.typeOfInput = model.typeOfInput;
    this.nameOfInput = model.nameOfInput;
    this.inputValues = model.inputValues;
    this.setInputValues = model.setInputValues;
    this.rightButtons = model.rightButtons;
    this.leftButtons = model.leftButtons;
  }

  //#region properties

  public id: number = 0;
  public inputValues: any;
  public nameOfInput: string;
  public typeOfInput: string;
  public rightButtons?: any;
  public leftButtons?: any;
  public setInputValues: any;

  @observable
  public countries: Array<any> = [];

  //#endregion

  //#region methods

  public async getAllCountries(): Promise<ServerResponseInterface<Array<any>>> {
    try {
      let response = await getCountries();

        // if (!response.ok) {
        //   return { didFail: true, failReason: response.statusText };
        // }

      return { didFail: false, data: response };
    } catch (e) {
      return { didFail: false, failReason: String(e) };
    }
  }

  public async fetchCountries() {
    await this.runWithAwareness(async () => {
      var response = await this.getAllCountries();

      if (response.didFail) {
        this.didRequestFail = true;
        this.failReason = response.failReason;
      } else {
        this.countries = response.data as Array<any>;
      }
    });
  }

  //#endregion
}
