import {calculateBetweenDates, ChartTextColor} from "../utils/statistics";
import {isOneDay} from "../utils/common";
import moment from "moment";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const renderDaysChart = (daysCtx, tasks, dateFrom, dateTo) => {
  const days = calculateBetweenDates(dateFrom, dateTo);

  const taskCountOnDay = days.map((date) => {
    return tasks.filter((task) => {
      return isOneDay(task.dueDate, date);
    }).length;
  });

  const formattedDates = days.map((item) => moment(item).format(`DD MMM`));

  return new Chart(daysCtx, {
    plugins: [ChartDataLabels],
    type: `line`,
    data: {
      labels: formattedDates,
      datasets: [{
        data: taskCountOnDay,
        backgroundColor: `transparent`,
        borderColor: ChartTextColor.CHART_TEXT_COLOR,
        borderWidth: 1,
        lineTension: 0,
        pointRadius: 8,
        pointHoverRadius: 8,
        pointBackgroundColor: ChartTextColor.CHART_TEXT_COLOR
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 8
          },
          color: ChartTextColor.CHART_TEXT_COLOR_INVERSE
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            display: false
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            fontStyle: `bold`,
            fontColor: ChartTextColor.CHART_TEXT_COLOR
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }]
      },
      legend: {
        display: false
      },
      layout: {
        padding: {
          top: 10
        }
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

export {renderDaysChart};
