import { TOGGLE_SIDEBAR } from "../types";

import axios from "axios";

export const toggleSidebar = (data) => ({
  type: "TOGGLE_SIDEBAR",
  payload: data,
});
