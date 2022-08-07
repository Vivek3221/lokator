export const API_URL = window.location.href.includes("localhost")
  ? "http://3.212.76.159:3000/api"
  : "/api";
export const ItemperPage = 20;

export const scopes = [
  {
    label: "Sand",
    value: "Sand",
  },
  {
    label: "Rock",
    value: "Rock",
  },
  {
    label: "Sabkha",
    value: "Sabkha",
  },
];

export const priceType = [
  {
    label: "Monthly",
    value: "Monthly",
  },
  {
    label: "Weekly",
    value: "Weekly",
  },
  {
    label: "Daily",
    value: "Daily",
  },
];
