import { makeAutoObservable, observable, runInAction, configure } from "mobx";
import Control from "../models/Control";
import { getCountryByName } from "../api/apiService";

configure({ enforceActions: "always" });
export default class ButtonViewModel {
  constructor(model: Control) {
    makeAutoObservable(this);
    this.model = model;
  }

  model: Control;

  @observable.ref
  countries: Array<any> = [];

  loadCountryByName = async (countryName: string) => {
    const response = await getCountryByName(countryName);

    runInAction(() => {
      this.countries = response;
    });
  };
}
