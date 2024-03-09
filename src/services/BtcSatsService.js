class BtcSatsService {
  static #LOCAL_STORAGE_KEY = "SHOW_SATS";

  static showSats() {
    let showSats = localStorage.getItem(this.#LOCAL_STORAGE_KEY) ?? false;

    // Already has value. Needs to parse from string into JS object.
    if (typeof showSats === "string") {
      showSats = showSats === "true" ? true : false;
    }

    return showSats;
  }

  static toggleSetting() {
    const showSats = this.showSats();

    localStorage.setItem(this.#LOCAL_STORAGE_KEY, !showSats);
  }
}

export default BtcSatsService;
