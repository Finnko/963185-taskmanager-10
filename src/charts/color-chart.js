import {calcUniqCountColor, getUniqItems, ColorValue, ChartTextColor} from "../utils/statistics";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const renderColorsChart = (colorsCtx, tasks) => {
  const colors = tasks
    .map((task) => task.color)
    .filter(getUniqItems);

  return new Chart(colorsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: colors,
      datasets: [{
        data: colors.map((color) => calcUniqCountColor(tasks, color)),
        backgroundColor: colors.map((color) => ColorValue[color])
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, item) => acc + parseFloat(item));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: ChartTextColor.CHART_TEXT_COLOR_INVERSE,
        bodyFontColor: ChartTextColor.CHART_TEXT_COLOR,
        borderColor: ChartTextColor.CHART_TEXT_COLOR,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: `DONE BY: COLORS`,
        fontSize: 16,
        fontColor: ChartTextColor.CHART_TEXT_COLOR
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: ChartTextColor.CHART_TEXT_COLOR,
          fontSize: 13
        }
      }
    }
  });
};

export {renderColorsChart};
