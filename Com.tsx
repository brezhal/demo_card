import React, { useState } from 'react';
import { Button, Table, Modal } from 'antd';
import ReactECharts from 'echarts-for-react';
import XLSX from 'xlsx';

function DataSwitcher({ data, type }) {
  const [showTable, setShowTable] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const columns = Object.keys(data[0]).map((key) => ({
    title: key,
    dataIndex: key,
    key: key,
  }));

  let option;
  switch (type) {
    case 'bar':
      option = {
        xAxis: {
          type: 'category',
          data: data.map((item) => item.name),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: 'bar',
            data: data.map((item) => item.age),
          },
        ],
      };
      break;
    case 'pie':
      option = {
        series: [
          {
            type: 'pie',
            data: data.map((item) => ({ name: item.name, value: item.age })),
          },
        ],
      };
      break;
    case 'line':
      option = {
        xAxis: {
          type: 'category',
          data: data.map((item) => item.name),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: 'line',
            data: data.map((item) => item.age),
          },
        ],
      };
      break;
    default:
      option = {};
  }

  const exportToExcel = () => {
    let ws_data = [];
    if (showTable) {
      ws_data = data.map((item) => [item.name, item.age, item.address]);
    } else {
      ws_data =
        type === 'pie'
          ? [data.map((item) => item.name), data.map((item) => item.age)]
          : [option.xAxis.data, option.series[0].data];
    }
    let ws = XLSX.utils.aoa_to_sheet(ws_data);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'export.xlsx');
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="DataSwitcher">
      <Button onClick={() => setShowTable(!showTable)}>
        {showTable ? `显示图表` : `显示表格`}
      </Button>
      <Button onClick={exportToExcel}>导出为excel</Button>
      <Button onClick={toggleModal}>放大预览</Button>
      {showTable ? (
        <Table dataSource={data} columns={columns} />
      ) : (
        <ReactECharts option={option} />
      )}
      <Modal visible={showModal} onCancel={toggleModal} footer={null}>
        {showTable ? (
          <Table dataSource={data} columns={columns} />
        ) : (
          <ReactECharts option={option} />
        )}
      </Modal>
    </div>
  );
}

export default DataSwitcher;
