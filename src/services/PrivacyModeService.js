class PrivacyModeService {
  static #LOCAL_STORAGE_KEY = "PRIVACY_MODE";

  static isEnabled() {
    let privacyMode = localStorage.getItem(this.#LOCAL_STORAGE_KEY) ?? false;

    // Already has value. Needs to parse from string into JS object.
    if (typeof privacyMode === "string") {
      privacyMode = privacyMode === "true" ? true : false;
    }

    return privacyMode;
  }

  static toggleSetting() {
    const privacyMode = this.isEnabled();

    localStorage.setItem(this.#LOCAL_STORAGE_KEY, !privacyMode);
  }
}

export default PrivacyModeService;
