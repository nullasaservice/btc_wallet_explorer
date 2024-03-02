class AddressService {
  static #LOCAL_STORAGE_KEY = "ADDRESSES";

  static getAddresses() {
    let addresses = localStorage.getItem(this.#LOCAL_STORAGE_KEY) ?? [];

    // Already has value. Needs to parse from string into JS object.
    if (typeof addresses === "string") {
      addresses = JSON.parse(addresses);
    }

    return addresses;
  }

  static getCount() {
    return this.getAddresses().length;
  }

  static isEmpty() {
    return this.getCount() === 0;
  }

  static save(addresses) {
    const stringifiedJson = JSON.stringify(addresses);

    localStorage.setItem(this.#LOCAL_STORAGE_KEY, stringifiedJson);

    // Needed so "AddressInfoRenderer" component gets updated
    window.dispatchEvent(new Event("storage"));
  }

  static append(address) {
    const addresses = this.getAddresses().concat(address);

    this.save(addresses);
  }

  static addAtIndex(index, address) {
    const addresses = this.getAddresses();

    addresses[index] = address;

    this.save(addresses);
  }

  static removeAtIndex(index) {
    const addresses = this.getAddresses();
    const newAddresses = addresses.toSpliced(index, 1);

    this.save(newAddresses);
  }

  static getWithIndex(index) {
    return this.getAddresses().at(index);
  }
}

export default AddressService;
