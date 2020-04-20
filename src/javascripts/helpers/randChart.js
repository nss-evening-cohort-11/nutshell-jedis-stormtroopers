import plotly from 'plotly.js/dist/plotly';

const randomChart = (color, xlabel, ylabel, randRange, divId) => {
  const getRandValue = () => Math.ceil(Math.random() * `${randRange}`);

  plotly.plot(`${divId}`, [{
    y: [getRandValue()],
    type: 'line',
  }], {
    colorway: [`${color}`],
    autosize: false,
    width: 1200,
    height: 400,
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
      pad: 2,
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
