import { colors as value } from "../../../constant/colors";
// eslint-disable-next-line
export default {
  height: 228,
  type: "donut",
  options: {
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      min: 0,
      max: 100,
    },

    legend: {
      show: true,
      position: "bottom",
      fontFamily: "inherit",
      labels: {
        colors: "inherit",
      },
    },
    itemMargin: {
      horizontal: 10,
      vertical: 10,
    },
    labels: ["Youtube", "Facebook", "Twitter"],
    colors: [value.error, value.primary, value.info],
  },
  series: [1258, 975, 500],
};
