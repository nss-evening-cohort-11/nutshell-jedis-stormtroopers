import plotly from 'plotly.js/dist/plotly';

const randomChart = (color, xlabel, ylabel, randRange, divId) => {
  const getRandValue = () => Math.ceil(Math.random() * `${randRange}`);

  plotly.plot(`${divId}`, [{
    y: [getRandValue()],
    type: 'line',
  }], {
    colorway: [`${color}`],
    autosize: false,
    width: 1300,
    height: 500,
    margin: {
      l: 50,
      r: 50,
      b: 100,
      t: 100,
      pad: 4,
    },
    paper_bgcolor: '#7f7f7f',
    plot_bgcolor: '#c7c7c7',
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
  }, {
    responsive: true,
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
