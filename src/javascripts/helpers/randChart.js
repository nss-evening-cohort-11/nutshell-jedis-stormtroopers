import plotly from 'plotly.js/dist/plotly';

const randomChart = (color, xlabel, ylabel, randRange, refreshInterval) => {
  const getRandValue = () => Math.ceil(Math.random() * `${randRange}`);

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
  }, `${refreshInterval}`);
};

export default { randomChart };
