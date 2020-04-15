import plotly from 'plotly.js/dist/plotly';

const randomChart = (color, xlabel, ylabel, randRange, divId) => {
  const getRandValue = () => Math.ceil(Math.random() * `${randRange}`);

  plotly.plot(`${divId}`, [{
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
    plotly.extendTraces(`${divId}`, { y: [[getRandValue()]] }, [0]);
    count += 1;
    if (count >= 300) {
      plotly.relayout(`${divId}`, {
        xaxis: {
          range: [count - 300, count],
        },
      });
    }
  }, 40);
};

export default { randomChart };
