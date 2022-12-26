import { makeObservable, toJS, observable } from "mobx";
import PromiseAwareViewModelBase from "./PromiseAwareViewModelBase";
import Control from "../models/Control";
import { getCountryByName } from "../api/apiService";

interface ServerResponseInterface<T> {
  didFail: boolean;
  failReason?: string;
  data?: T;
}

export default class ButtonViewModel extends PromiseAwareViewModelBase {
  constructor(
    model: Control
  ) {
    super();
    makeObservable(this);
    this.model = model
  }

  //#region properties
  public model: Control;

  @observable.ref
  public countries: Array<any> = [];

  //#endregion

  //#region methods

  public async getAllCountries(countryName: string): Promise<ServerResponseInterface<Array<any>>> {
    try {
      let response = await getCountryByName(countryName);

        // if (!response.ok) {
        //   return { didFail: true, failReason: response.statusText };
        // }

      return { didFail: false, data: response };
    } catch (e) {
      return { didFail: false, failReason: String(e) };
    }
  }

  public async fetchCountries(countryName: string) {
    await this.runWithAwareness(async () => {
      let response = await this.getAllCountries(countryName);

      if (response.didFail) {
        this.didRequestFail = true;
        this.failReason = response.failReason;
      } else {
          this.countries = toJS(response.data) as Array<any>;
      }
    });
  }

  //#endregion
}
