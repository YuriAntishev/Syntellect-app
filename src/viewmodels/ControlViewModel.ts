import { makeObservable, observable } from "mobx";
import PromiseAwareViewModelBase from "./PromiseAwareViewModelBase";
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
    this.model = model
  }

  //#region properties
  public model: Control;

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
