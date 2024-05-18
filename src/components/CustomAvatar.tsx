import { getNameInitials } from "@/utilities";
import { Avatar as AntdAvatar } from "antd";
import { AvatarProps } from 'antd/lib';

type Props = AvatarProps & {
    name? : string
}
function CustomAvatar({ name, style, ...rest}:Props) {
  return (
    <AntdAvatar
    alt={name}
    size="small"
    style={{
        backgroundColor: "#90df6f",
        display : "flex",
        alignItems: "center",
        border : "none",
        ...style
    }}
    {...rest}
    >
      {getNameInitials(name || '')}
    </AntdAvatar>
  )
}

export default CustomAvatar
