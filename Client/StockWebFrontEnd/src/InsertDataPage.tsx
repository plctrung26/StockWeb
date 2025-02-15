import { Button, DatePicker, FloatButton, Form, Input, InputNumber, Select, TimePicker, TimePickerProps } from "antd"
import { CommentOutlined, CustomerServiceOutlined, QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import TSelector from "./components/tSelector"
import './static/InsertDataPage.scss'

const InsertDataPage = () => {
    const onChange: TimePickerProps['onChange'] = (time, timeString) => {
        console.log(time, timeString);
    };

    return (
        <div className="insertPage">
            <div className="submitFormSpace">

                <Form
                    layout="vertical"
                    className="submitForm"
                >
                    <div className="formTitle">
                        Insert New Data
                    </div>
                    <Form.Item label="DATE">
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="Item">
                        <Input />
                    </Form.Item>
                    <Form.Item label="T1_1">
                        <TSelector />
                    </Form.Item>
                    <Form.Item label="T1_2">
                        <TSelector />
                    </Form.Item>
                    <Form.Item label="T1_3">
                        <TSelector />
                    </Form.Item>
                    <Form.Item label="T2_1">
                        <TSelector />
                    </Form.Item>
                    <Form.Item label="T2_2">
                        <TSelector />
                    </Form.Item>
                    <Form.Item label="T2_3">
                        <TSelector />
                    </Form.Item>
                    <Form.Item label="T3_1">
                        <TSelector />
                    </Form.Item>
                    <Form.Item label="T3_2">
                        <TSelector />
                    </Form.Item>
                    <Form.Item label="T3_3">
                        <TSelector />
                    </Form.Item>
                    <Form.Item label="T4_1">
                        <TSelector />
                    </Form.Item>
                    <Form.Item label="T4_2">
                        <TSelector />
                    </Form.Item>
                    <Form.Item label="T4_3">
                        <TSelector />
                    </Form.Item>
                    <Form.Item label="Type">
                        <Select>
                            <Select.Option value="GT0">GT0</Select.Option>
                            <Select.Option value="GT5">GT5</Select.Option>
                            <Select.Option value="LT5">LT5</Select.Option>
                            <Select.Option value="GT10">GT10</Select.Option>
                            <Select.Option value="LT10">LT10</Select.Option>
                            <Select.Option value="GT20">LT20</Select.Option>
                            <Select.Option value="LT20">LT20</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Delta">
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label='Time'>
                        <TimePicker
                            use12Hours
                            format="h:mm:ss A"
                            onChange={onChange}
                            // value={time}
                            // onChange={handleChange}
                            hideDisabledOptions={true}
                            disabledTime={() => {
                                return {
                                    disabledSeconds: () => {
                                        return Array.from({ length: 60 }, (_, i) => i).filter((second) => second !== 0); // Only second 0 allowed
                                    },
                                };
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="ValVN30">
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="VolMax5m">
                        <InputNumber />
                    </Form.Item>
                </Form>
            </div>
            <>
                <FloatButton.Group shape="circle" style={{ insetInlineEnd: 50 }}>
                    <FloatButton
                        tooltip={<div>Save</div>}
                    />
                    <FloatButton
                        icon={<SyncOutlined />}
                        tooltip={<div>History</div>}
                    />
                </FloatButton.Group>
            </>
        </div>
    )
}

export default InsertDataPage