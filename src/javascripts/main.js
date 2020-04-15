import plotly from 'plotly.js/dist/plotly';
import '../styles/main.scss';
// import utils from './helpers/utils';

const randomChart = (color, xlabel, ylabel) => {
  const getRandValue = () => Math.ceil(Math.random() * 100);

  plotly.plot('chart', [{
    y: [getRandValue()],
    type: 'line',
  }], {
    colorway: [`${color}`],
    xaxis: {
      title: {
        text: `${xlabel}`,
      },
    },
    yaxis: {
      title: {
        text: `${ylabel}`,
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
  randomChart('#3734eb', 'butts', 'farts');
};

init();

console.error('hi');
