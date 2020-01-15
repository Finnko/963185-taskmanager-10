import {createRandomColor, getUniqItems, ChartTextColor} from "../utils/statistics";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const renderTagsChart = (tagsCtx, tasks) => {
  const tagsLabels = tasks.map((task) => task.tags)
    .reduce((acc, tags) => {
      return acc.concat(Array.from(tags));
    }, [])
    .filter(getUniqItems);

  return new Chart(tagsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: tagsLabels,
      datasets: [{
        data: tagsLabels.map((tag) => tasks.reduce((acc, task) => {
          const targetTasksCount = Array.from(task.tags)
            .filter((item) => item === tag).length;

          return acc + targetTasksCount;
        }, 0)),
        backgroundColor: tagsLabels.map(createRandomColor)
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

            const total = allData.reduce((acc, it) => acc + parseFloat(it));
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
        text: `DONE BY: TAGS`,
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

export {renderTagsChart};
