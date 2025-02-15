import { type TableColumnsType } from 'antd';
import { tableDataType } from '../types/tableDataType';
import dayjs from 'dayjs';
import chartTag from '../components/chartTag';


export const tableColumns: TableColumnsType<tableDataType> = [
    {
        title: 'DATE',
        dataIndex: 'DATE',
        render: (text: string) => {
            return dayjs(text, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DDTHH:mm:ssZ']).format('YYYY-MM-DD');
        }
    },
    {
        title: 'Item',
        dataIndex: 'Item'
    },
    {
        title: 'T1_1',
        dataIndex: 'T1_1',
        render: (tag: number) => chartTag(tag)
    },
    {
        title: 'T1_2',
        dataIndex: 'T1_2',
        render: (tag: number) => chartTag(tag)
    },
    {
        title: 'T1_3',
        dataIndex: 'T1_3',
        render: (tag: number) => chartTag(tag)
    },
    {
        title: 'T2_1',
        dataIndex: 'T2_1',
        render: (tag: number) => chartTag(tag)
    },
    {
        title: 'T2_2',
        dataIndex: 'T2_2',
        render: (tag: number) => chartTag(tag)
    },
    {
        title: 'T2_3',
        dataIndex: 'T2_3',
        render: (tag: number) => chartTag(tag)
    },
    {
        title: 'T3_1',
        dataIndex: 'T3_1',
        render: (tag: number) => chartTag(tag)
    },
    {
        title: 'T3_2',
        dataIndex: 'T3_2',
        render: (tag: number) => chartTag(tag)
    },
    {
        title: 'T3_3',
        dataIndex: 'T3_3',
        render: (tag: number) => chartTag(tag)
    },
    {
        title: 'T4_1',
        dataIndex: 'T4_1',
        render: (tag: number) => chartTag(tag)
    },
    {
        title: 'T4_2',
        dataIndex: 'T4_2',
        render: (tag: number) => chartTag(tag)
    },
    {
        title: 'T4_3',
        dataIndex: 'T4_3',
        render: (tag: number) => chartTag(tag)
    },
    {
        title: 'Type',
        dataIndex: 'Type',
        filters: [{
            text: "ExampleType",
            value: "ExampleType"
        }],
        filterMode: 'menu',
        filterSearch: true,
        onFilter: (value, record) => {
            return record.Type === (value as string);
        },
    },
    {
        title: 'Delta',
        dataIndex: 'Delta'
    },
    {
        title: 'Time',
        dataIndex: 'Time',
        filters: [],
        filterMode: 'menu',
        filterSearch: true,
        onFilter: (value, record) => {
            return record.Time === (value as string);
        },
    },
    {
        title: 'ValVN30',
        dataIndex: 'ValVN30',
        sorter: (a, b) => a.ValVN30 - b.ValVN30
    },
    {
        title: 'VolMax5m',
        dataIndex: 'VolMax5m'
    },
];

export type ResultType = [
    {
        T1: Record<string, number>,
        T2: Record<string, number>,
        T3: Record<string, number>,
        T4: Record<string, number>
    }
];