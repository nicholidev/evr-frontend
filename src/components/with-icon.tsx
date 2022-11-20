import { Icon } from "@iconify/react";
import { FC } from "react";
import styled from "styled-components";

interface Props {
    children: any;
    icon: string;
}

const WithIcon: FC<Props> = (props) =>
{
    const { children, icon } = props

    return (
        <WithIconWrap>
            {children}
            <div className="icon-area">
                <Icon icon={icon}/>
            </div>
        </WithIconWrap>
    )
}


export const WithIconWrap = styled.div`
  padding-right: 100px;
  position: relative;
  .icon-area {
    display: flex;
    position: absolute;
    right: 10px;
    top: 10px;
    
    svg {
      width: 45px;
      height:45px;
      color: #ffffff;
    }
  }
`


export default WithIcon