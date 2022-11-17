import { Card, Col, List, Row, Space } from "antd";
import Container from "components/container";
import MainLayout from "layouts";
import { NextPage } from "next";

const data = [
    {
        label: "Server",
        value: "stratum.ravenpool.ninja"
    },
    {
        label: "Stratum Port 1-2 GPU",
        value: "3333"
    },
    {
        label: "Stratum three",
        value: "3333"
    },
];

const ConnectPage: NextPage = () =>
{
    return (
        <MainLayout>
            <Container>
                <Row
                    gutter={[24, 32]}
                >
                    <Col span={24}>
                        <Card>
                            <List
                                bordered
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item>
                                        <Row style={{ width: "100%" }}>
                                            <Col span={12}>
                                                <h5 style={{ marginBottom: 0 }}>{item.label}</h5>
                                            </Col>
                                            <Col span={12}>
                                                <p style={{ marginBottom: 0 }}>{item.value}</p>
                                            </Col>
                                        </Row>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card
                            title="Settings for T-Rex:"
                        >
                            <code>
                                t-rex.exe -a kawpow -o stratum+tcp://stratum.ravenpool.ninja:4444 -u WALLET_ADDRESS.WORKER -p x
                                pause
                            </code>
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card
                            title="Settings for T-Rex:"
                        >
                            <code>
                                t-rex.exe -a kawpow -o stratum+tcp://stratum.ravenpool.ninja:4444 -u WALLET_ADDRESS.WORKER -p x
                                pause
                            </code>
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card
                            title="Settings for T-Rex:"
                        >
                            <code>
                                t-rex.exe -a kawpow -o stratum+tcp://stratum.ravenpool.ninja:4444 -u WALLET_ADDRESS.WORKER -p x
                                pause
                            </code>
                        </Card>
                    </Col>

                    <Col span={24}>
                        <Card
                            title="Settings for HiveOS"
                        >
                            <Space
                                direction="vertical"
                                size={24}
                                style={{ alignItems:"center", width: "100%" }}
                            >
                                <img src="https://i.imgur.com/FXSlZNc.png" alt=""/>
                                <img src="https://i.imgur.com/FXSlZNc.png" alt=""/>
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    )
}


export default ConnectPage