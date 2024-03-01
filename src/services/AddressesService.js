class AddressesService {
  static #LOCAL_STORAGE_KEY = "ADDRESSES";

  static getAddresses() {
    let addresses = localStorage.getItem(this.#LOCAL_STORAGE_KEY) ?? [];

    // Already has value. Needs to parse from string into JS object.
    if (typeof addresses === "string") {
      addresses = JSON.parse(addresses);
    }

    return addresses;
  }

  static getNumberAddresses() {
    return this.getAddresses().length;
  }

  static isEmpty() {
    return this.getNumberAddresses() === 0;
  }

  static addAddress(address) {
    const addresses = this.getAddresses().concat(address);
    const stringifiedJson = JSON.stringify(addresses);

    localStorage.setItem(this.#LOCAL_STORAGE_KEY, stringifiedJson);

    // Needed so "AddressInfoRenderer" component gets updated
    window.dispatchEvent(new Event("storage"));
  }

  static getAddressWithIndex(index) {
    return this.getAddresses().at(index);
  }
}

export default AddressesService;
