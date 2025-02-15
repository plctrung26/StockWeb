import { Tag } from "antd"

const chartTag = (tag: number) => {
    let color = 'blue'
    let textColor = 'black'
    if (tag === 129) {
        color = '#FFDD00'
    } else if (tag === 192) {
        color = '#0EFF00'
    } else if (tag === 912) {
        color = '#0073e6'
    } else if (tag === 921) {
        color = '#FF00FF'
    } else if (tag === 291) {
        color = '#FF0000'
    } else if (tag === 219) {
        color = '#FF5B00'
    }
    return (
        <>
            <Tag color={color} style={{ color: textColor, fontWeight: "bold" }}>{tag}</Tag>
        </>
    )
}

export default chartTag