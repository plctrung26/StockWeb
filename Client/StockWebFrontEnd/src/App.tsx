import { Col, Row, Statistic, Table, Tooltip } from 'antd';
import type { TableProps } from 'antd';
import { tableDataType } from './types/tableDataType';
import { tableColumns } from './constants/tableColumns';
import { useEffect, useState } from 'react';
import { chartDefaultData, chartDataItem, chartTempDataItem } from './constants/chartColumns';
import { Bar, BarChart, CartesianGrid, LabelList, Legend, XAxis, YAxis } from 'recharts';
import './static/HomePage.scss'

const App = () => {
  const [tableData, setTableData] = useState<tableDataType[]>([]);
  const [chartTData, setChartTData] = useState<chartDataItem[] | tableDataType[]>([])
  const [chartTimeData, setChartTimeData] = useState<chartDataItem[] | tableDataType[]>([])
  const [avgValVN30, setAvgValVN30] = useState<number>(0)
  const [avgVolMax5m, setAvgVolMax5m] = useState<number>(0)

  const loadData = async (path: string): Promise<any> => {
    try {
      const response = await fetch(path);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return error;
    }
  };

  const replaceValues = (Data: chartDataItem[], tempData: chartTempDataItem, targetKey: string) => {
    return Data.map(item => {
      if (item.key === targetKey) {
        return {
          ...item,
          ...Object.fromEntries(
            Object.keys(item).filter(key => key !== "key").map(key => [
              key,
              key in tempData ? tempData[key] : 0
            ])
          )
        };
      }
      return item;
    });
  }

  const countTValue = (data: chartDataItem[] | tableDataType[]) => {
    const T1 = data.reduce<Record<string, number>>((acc, obj) => {
      [obj.T1_1, obj.T1_2, obj.T1_3].forEach(value => {
        acc[value] = (acc[value] || 0) + 1;
      });
      return acc;
    }, {})
    let finalData = replaceValues(chartDefaultData, T1, "T1")

    const T2 = data.reduce<Record<string, number>>((acc, obj) => {
      [obj.T2_1, obj.T2_2, obj.T2_3].forEach(value => {
        acc[value] = (acc[value] || 0) + 1;
      });
      return acc;
    }, {})
    finalData = replaceValues(finalData, T2, "T2")

    const T3 = data.reduce<Record<string, number>>((acc, obj) => {
      [obj.T3_1, obj.T3_2, obj.T3_3].forEach(value => {
        acc[value] = (acc[value] || 0) + 1;
      });
      return acc;
    }, {})
    finalData = replaceValues(finalData, T3, "T3")

    const T4 = data.reduce<Record<string, number>>((acc, obj) => {
      [obj.T4_1, obj.T4_2, obj.T4_3].forEach(value => {
        acc[value] = (acc[value] || 0) + 1;
      });
      return acc;
    }, {})
    finalData = replaceValues(finalData, T4, "T4")
    return finalData;
  }

  const countTimeValue = (data: chartDataItem[] | tableDataType[]) => {
    const timeCount: chartTempDataItem = data.reduce<Record<string, number>>((acc, obj) => {
      [obj.Time].forEach(value => {
        acc[value] = (acc[value] || 0) + 1;
      });
      return acc;
    }, {})
    const transformObject = Object.entries(timeCount).map(([key, value]) => ({ key, value }));
    return (
      transformObject
    )

  }

  const averageCalc = (data: tableDataType[], column: keyof tableDataType) => {
    if (!data.length) return 0;
    return data.reduce((sum, obj) => sum + (Number(obj[column]) || 0), 0) / data.length;
  }

  const chartTimeWidth = chartTimeData.length < 6 ? 750 : chartTimeData.length * 100;

  useEffect((): any => {
    const fetchData = async () => {
      const res = await loadData("http://localhost:8080/api/get-data");
      var listData = res.recordset
      var typeList = new Array()
      var timeList = new Array()
      listData.forEach((item: any) => {
        item['key'] = `data_row_${item.id}`;

        // This is the code to filter the Type value set
        const typeValue = {
          text: item['Type'],
          value: item['Type']
        }
        const checkType = typeList.some((item) => {
          return JSON.stringify(item) === JSON.stringify(typeValue)
        })
        if (!checkType) {
          typeList.push(typeValue)
        }

        // This is the code to get the Time value set
        const timeValue = {
          text: item['Time'],
          value: item['Time']
        }
        const checkTime = timeList.some((item) => {
          return JSON.stringify(item) === JSON.stringify(timeValue)
        })
        if (!checkTime) {
          timeList.push(timeValue)
        }
      });

      // Map value set to the tablecolumns
      tableColumns.map((item) => {
        if (item.title === "Type") {
          item.filters = typeList
        }
        if (item.title === "Time") {
          item.filters = timeList
        }
      })
      setTableData(listData)
      const Tdata = countTValue(listData)
      setChartTData(Tdata)
      const timeData = countTimeValue(listData)
      setChartTimeData(timeData)
      const averageValVN30 = averageCalc(listData, 'ValVN30')
      const averageVolMax5m = averageCalc(listData, 'VolMax5m')
      setAvgValVN30(averageValVN30)
      setAvgVolMax5m(averageVolMax5m)
    };

    fetchData();
  }, [])

  const onChange: TableProps<tableDataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
    const data = extra.currentDataSource
    const Tdata = countTValue(data)
    const timeData = countTimeValue(data)
    const averageValVN30 = averageCalc(data, 'ValVN30')
    const averageVolMax5m = averageCalc(data, 'VolMax5m')
    setAvgValVN30(averageValVN30)
    setAvgVolMax5m(averageVolMax5m)
    setChartTData(Tdata)
    setChartTimeData(timeData)
  };

  return (
    <div className='page'>
      <div className='pageCard' >
        <Row gutter={16} justify="center" align="middle">
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Statistic title="Average Value VN30"
              value={avgValVN30}
              precision={4}
              style={{ textAlign: 'center' }}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Statistic title="Average Volume Max 5m"
              value={avgVolMax5m}
              precision={0}
              style={{ textAlign: 'center' }}
            />
          </Col>
        </Row>
      </div>
      <div className='chartSpace' >
        <div className='chartDisplayT' style={{ width: "100%", overflow: "visible" }}>
          <BarChart width={730} height={250} data={chartTData} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="key" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend
              verticalAlign="top"
              align="center"
              iconType='square'
              wrapperStyle={{ marginBottom: 10, marginTop: -20 }}
            />
            <Bar dataKey="129" fill="#FFDD00" >
              <LabelList dataKey="129" position="top" />
            </Bar>
            <Bar dataKey="192" fill="#0EFF00" >
              <LabelList dataKey="192" position="top" />
            </Bar>
            <Bar dataKey="912" fill="#0073e6" >
              <LabelList dataKey="912" position="top" />
            </Bar>
            <Bar dataKey="921" fill="#FF00FF" >
              <LabelList dataKey="921" position="top" />
            </Bar>
            <Bar dataKey="291" fill="#FF0000" >
              <LabelList dataKey="291" position="top" />
            </Bar>
            <Bar dataKey="219" fill="#FF5B00" >
              <LabelList dataKey="219" position="top" />
            </Bar>
          </BarChart>
        </div>
        <div className='chartDisplayTime' style={{ width: "100%", overflowX: 'auto', overflowY: 'hidden', paddingTop: "30px" }}>
          <BarChart width={chartTimeWidth} height={250} data={chartTimeData} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="key" />
            <YAxis allowDecimals={false} domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.1)]} />
            <Tooltip />
            <Bar dataKey="value" fill='#4F78A6' >
              <LabelList dataKey="value" position="top" />
            </Bar>
          </BarChart>
        </div>
      </div>
      <div className='tableSpace'>
        <div className='tableDisplayData'>
          <Table<tableDataType>
            columns={tableColumns}
            dataSource={tableData}
            onChange={onChange}
            pagination={{
              pageSize: 10,
              showSizeChanger: false,
              pageSizeOptions: ["5", "10", "20", "50"],
              position: ["bottomCenter"],
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
