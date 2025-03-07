import { Select } from "antd"

const TSelector = ({ value, onChange }: { value?: string; onChange?: (val: string) => void }) => {
    return (

        <Select value={value} onChange={onChange}>
            <Select.Option value="129">129</Select.Option>
            <Select.Option value="192">192</Select.Option>
            <Select.Option value="912">912</Select.Option>
            <Select.Option value="921">921</Select.Option>
            <Select.Option value="291">291</Select.Option>
            <Select.Option value="219">219</Select.Option>
        </Select>
    )
}

export default TSelector