import plotly from 'plotly.js/dist/plotly';
import '../styles/main.scss';
// import utils from './helpers/utils';

const randomChart = () => {
  const getRandValue = () => Math.ceil(Math.random() * 100);

  plotly.plot('chart', [{
    y: [getRandValue()],
    type: 'line',
  }], {
    colorway: ['#cd7eaf'],
    xaxis: {
      title: {
        text: 'Number of Ratings',
      },
    },
    yaxis: {
      title: {
        text: 'Customer Ratings',
      },
    },
  });

  let count = 0;

  setInterval(() => {
    plotly.extendTraces('chart', { y: [[getRandValue()]] }, [0]);
    count += 1;
    if (count >= 300) {
      plotly.relayout('chart', {
        xaxis: {
          range: [count - 300, count],
        },
      });
    }
  }, 40);
};

const init = () => {
  randomChart();
};

init();

console.error('hi');
