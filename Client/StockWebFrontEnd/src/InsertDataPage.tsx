import { DatePicker, FloatButton, Form, Input, InputNumber, Select, TimePicker } from "antd"
import { SyncOutlined } from '@ant-design/icons';
import TSelector from "./components/tSelector"
import './static/InsertDataPage.scss'
import { useNavigate } from "react-router-dom";

const InsertDataPage = () => {

    const navigate = useNavigate();

    const [form] = Form.useForm();

    const isFormComplete = form.isFieldsTouched() && form.getFieldsValue();

    const onFinish = async (values: any) => {
        console.log("Form Data:", values); // Check the received values

        // Format the data if needed
        const formattedData = {
            ...values,
            DATE: values.Date?.format("YYYY-MM-DD"),
            Time: values.Time?.format("h:mm:ss A")
        };

        try {
            const response = await fetch("http://localhost:8080/api/send-data", { // Change URL to your backend
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
            });

            if (!response.ok) throw new Error("Failed to submit data");

            const result = await response.json();
            console.log("Success:", result);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="insertPage">
            <div className="submitFormSpace">

                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    className="submitForm"
                >
                    <div className="formTitle">
                        Insert New Data
                    </div>
                    <Form.Item label="DATE" name="Date" rules={[{ required: true, message: "Please select a date!" }]}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="Item" name="Item" rules={[{ required: true, message: "Please select a date!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="T1_1" name="T1_1" rules={[{ required: true, message: "Please select a date!" }]}>
                        <TSelector />
                    </Form.Item>
                    <Form.Item label="T1_2" name="T1_2" rules={[{ required: true, message: "Please select a date!" }]}>
                        <TSelector />
                    </Form.Item>
                    <Form.Item label="T1_3" name="T1_3" rules={[{ required: true, message: "Please select a date!" }]}>
                        <TSelector />
                    </Form.Item>
                    <Form.Item label="T2_1" name="T2_1" rules={[{ required: true, message: "Please select a date!" }]}>
                        <TSelector />
                    </Form.Item>
                    <Form.Item label="T2_2" name="T2_2" rules={[{ required: true, message: "Please select a date!" }]}>
                        <TSelector />
                    </Form.Item>
                    <Form.Item label="T2_3" name="T2_3" rules={[{ required: true, message: "Please select a date!" }]}>
                        <TSelector />
                    </Form.Item>
                    <Form.Item label="T3_1" name="T3_1" rules={[{ required: true, message: "Please select a date!" }]}>
                        <TSelector />
                    </Form.Item>
                    <Form.Item label="T3_2" name="T3_2" rules={[{ required: true, message: "Please select a date!" }]}>
                        <TSelector />
                    </Form.Item>
                    <Form.Item label="T3_3" name="T3_3" rules={[{ required: true, message: "Please select a date!" }]}>
                        <TSelector />
                    </Form.Item>
                    <Form.Item label="T4_1" name="T4_1" rules={[{ required: true, message: "Please select a date!" }]}>
                        <TSelector />
                    </Form.Item>
                    <Form.Item label="T4_2" name="T4_2" rules={[{ required: true, message: "Please select a date!" }]}>
                        <TSelector />
                    </Form.Item>
                    <Form.Item label="T4_3" name="T4_3" rules={[{ required: true, message: "Please select a date!" }]}>
                        <TSelector />
                    </Form.Item>
                    <Form.Item label="Type" name="Type" rules={[{ required: true, message: "Please select a date!" }]}>
                        <Select>
                            <Select.Option value="GT0">GT0</Select.Option>
                            <Select.Option value="GT5">GT5</Select.Option>
                            <Select.Option value="LT5">LT5</Select.Option>
                            <Select.Option value="GT10">GT10</Select.Option>
                            <Select.Option value="LT10">LT10</Select.Option>
                            <Select.Option value="GT20">GT20</Select.Option>
                            <Select.Option value="LT20">LT20</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Delta" name="Delta" rules={[{ required: true, message: "Please select a date!" }]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label='Time' name='Time' rules={[{ required: true, message: "Please select a date!" }]}>
                        <TimePicker
                            use12Hours
                            format="h:mm:ss A"
                            hideDisabledOptions={true}
                            disabledTime={() => {
                                return {
                                    disabledSeconds: () => {
                                        return Array.from({ length: 60 }, (_, i) => i).filter((second) => second !== 0);
                                    },
                                };
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="ValVN30" name="ValVN30" rules={[{ required: true, message: "Please select a date!" }]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="VolMax5m" name="VolMax5m" rules={[{ required: true, message: "Please select a date!" }]}>
                        <InputNumber />
                    </Form.Item>
                </Form>
            </div>
            <>
                <FloatButton.Group shape="circle" style={{ insetInlineEnd: 50 }}>
                    {
                        isFormComplete && <FloatButton
                            type="primary"
                            htmlType="submit"
                            tooltip={<div>Save</div>}
                            onClick={() => {
                                form.submit()
                                navigate('/')
                            }}
                        />
                    }
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