/**
 * @name UsernameSpoof
 * @version 1.0.0
 * @description Spoofs your username locally
 */
var i = require("@enmity/metro"), l = require("@enmity/patcher");
const a = "awesomepvpcat_destroyerofworldz", s = "officialfirefox";

module.exports = {
  name: "UsernameSpoof",
  version: "1.0.0",
  description: "Spoofs your username locally",
  onStart() {
    const r = i.getByProps("getCurrentUser", "getUser");
    this.unpatch1 = l.after(r, "getCurrentUser", (o, u, e) => {
      if (!e) return;
      const username = e.username?.toLowerCase();
      const globalName = e.globalName?.toLowerCase();
      if (username === s.toLowerCase() || globalName === s.toLowerCase()) {
        return { ...e, username: a, globalName: a };
      }
      return e;
    });
    this.unpatch2 = l.after(r, "getUser", (o, u, e) => {
      if (!e) return;
      const username = e.username?.toLowerCase();
      if (username === s.toLowerCase()) {
        return { ...e, username: a, globalName: a };
      }
      return e;
    });
  },
  onStop() {
    this.unpatch1?.();
    this.unpatch2?.();
  },
};