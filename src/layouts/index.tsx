import { Layout, Space } from "antd";
import { FC } from "react";

const { Header, Content, Footer } = Layout;


interface Props {
    children?: any;
}

const MainLayout: FC<Props> = (props) => {
    const { children } = props;

    return (
        <Layout >
            <Header
                style={{backgroundColor: "#ffffff"}}
            >
                <Space>
                    LOGO
                </Space>
            </Header>
            <Content>
                { children }
            </Content>
            <Footer>
                <Space>
                    Logo
                </Space>
            </Footer>
        </Layout >
    )
}


export default MainLayout