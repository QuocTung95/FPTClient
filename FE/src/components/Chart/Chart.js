import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { Select, Space } from 'antd';
import { faker } from '@faker-js/faker';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = ({ poll }) => {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState([]);
  const [typeChart, setTypeChart] = useState('verticalBar');
  const [options, setOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: poll.title || '',
      },
    },
  });

  useEffect(() => {
    if (!poll.votes) {
      return;
    }
    const newLabels = [];
    const newData = [];
    const newBackgroundColor = [];

    poll.votes.forEach((item) => {
      newLabels.push(item.option);
      newData.push(item.voters.length);
      newBackgroundColor.push(faker.color.rgb({ format: 'css', includeAlpha: true }));
    });

    const newOption = {
      ...options,
      plugins: {
        ...options.plugins,
        title: {
          ...options.plugins.title,
          text: poll.title || '',
        },
      },
    };

    setLabels(newLabels);
    setData(newData);
    setBackgroundColor(newBackgroundColor);
    setOptions(newOption);
  }, [poll, typeChart]);

  const onChangeType = (value) => {
    let newOption = {
      ...options,
    };
    switch (value) {
      case 'verticalBar':
        delete newOption.indexAxis;
        delete newOption.elements;
        newOption.plugins.legend = false;
        setOptions(newOption);
        break;
      case 'horizontalBar':
        newOption.indexAxis = 'y';
        newOption.plugins.legend = false;
        newOption.elements = {
          bar: {
            borderWidth: 2,
          },
        };
        setOptions(newOption);
        break;
      case 'pie':
        newOption.plugins.legend = true;
        setOptions(newOption);
        break;
      default:
        break;
    }
    setTypeChart(value);
  };

  const renderCase = () => {
    const dataChart = {
      labels,
      datasets: [
        {
          data,
          backgroundColor,
        },
      ],
    };
    switch (typeChart) {
      case 'verticalBar':
      case 'horizontalBar':
        return <Bar options={options} data={dataChart} />;
      case 'pie':
        return <Pie options={options} data={dataChart} />;

      default:
        return <Bar data={dataChart} />;
    }
  };

  return (
    <div>
      <div>
        <Select
          defaultValue={typeChart}
          style={{ width: 120 }}
          onChange={(value) => onChangeType(value)}
          options={[
            { value: 'verticalBar', label: 'Vertical Bar Chart' },
            { value: 'horizontalBar', label: 'Horizontal Bar Chart' },
            { value: 'pie', label: 'Pie Chart' },
          ]}
        />
      </div>
      <div key={typeChart}>{renderCase()}</div>
    </div>
  );
};

export default Chart;
