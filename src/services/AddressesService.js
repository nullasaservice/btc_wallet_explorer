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

  static isEmpty() {
    return this.getAddresses().length === 0;
  }

  static addAddress(address) {
    const addresses = this.getAddresses().concat(address);
    const stringifiedJson = JSON.stringify(addresses);

    localStorage.setItem(this.#LOCAL_STORAGE_KEY, stringifiedJson);
  }
}

export default AddressesService;
