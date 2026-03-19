import { getByProps } from "@enmity/metro";
import { after } from "@enmity/patcher";

const FAKE_NAME = "awesomepvpcat_destroyerofworldz";
const REAL_NAME = "firefox";

export default {
  name: "UsernameSpoof",
  version: "1.0.0",
  description: "Spoofs your username locally",

  onStart() {
    const UserStore = getByProps("getCurrentUser", "getUser");

    // Patch current user
    this.unpatch1 = after(UserStore, "getCurrentUser", (_, __, res) => {
      if (!res) return;

      if (
        res.username?.toLowerCase() === REAL_NAME.toLowerCase() ||
        res.globalName?.toLowerCase() === REAL_NAME.toLowerCase()
      ) {
        return {
          ...res,
          username: FAKE_NAME,
          globalName: FAKE_NAME
        };
      }

      return res;
    });

    // Patch all users (for messages, member list, etc.)
    this.unpatch2 = after(UserStore, "getUser", (_, args, res) => {
      if (!res) return;

      if (res.username?.toLowerCase() === REAL_NAME.toLowerCase()) {
        return {
          ...res,
          username: FAKE_NAME,
          globalName: FAKE_NAME
        };
      }

      return res;
    });
  },

  onStop() {
    this.unpatch1?.();
    this.unpatch2?.();
  }
};