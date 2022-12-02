import { Card, Col, List, Row, Space } from "antd";
import Container from "components/container";
import MainLayout from "layouts";
import { NextPage } from "next";
import Head from "next/head";

const data = [
    {
        label: "Pool Mining - USA East Coast",
        value: "us-east.evrpool.ninja:3333"
    },
    {
        label: "SOLO Mining - USA East Coast",
        value: "us-east.evrpool.ninja:5555"
    },
    {
        label: "Pool Mining - USA West Coast",
        value: "us-west.evrpool.ninja:3030"
    },
    {
        label: "SOLO Mining - USA West Coast",
        value: "us-west.evrpool.ninja:5050"
    },
    {
        label: "Pool Mining - Europe",
        value: "Coming Soon!"
    },
    {
        label: "SOLO Mining - Europe",
        value: "Coming Soon!"
    },
    {
        label: "Pool Mining - Asia",
        value: "Coming Soon!"
    },
    {
        label: "Pool Mining - Asia",
        value: "Coming Soon!"
    }
];

const ConnectPage: NextPage = () => 
{
    return (
        <MainLayout>
            <Head>
                <title>Connect</title>
                <meta name="description" content="EVRpool.ninja | Connect"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Container>
                <h1 className="page-title">Get Connected</h1>
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
                                            <Col
                                                span={24}
                                                sm={{ span: 12 }}
                                            >
                                                <h5 style={{ marginBottom: 0 }}>{item.label}</h5>
                                            </Col>
                                            <Col
                                                span={24}
                                                sm={{ span: 12 }}
                                            >
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
                            title="Settings for Wild-Rig Multi:"
                        >
                            <code>
                                wildrig.exe --algo evrprogpow --url stratum+tcp://evrpool.ninja:3333 --user Wallet.Worker --pass x
                            </code>
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card
                            title="Settings for evrProgPowMiner:"
                        >
                            <code>
                                evrprogpowminer.exe -P stratum+tcp://Wallet.Worker@evrpool.ninja:3333
                            </code>
                        </Card>
                    </Col>
                    {/* <Col span={24}>
                        <Card
                            title="Settings for T-Rex:"
                        >
                            <code>
                                t-rex.exe -a kawpow -o stratum+tcp://stratum.ravenpool.ninja:4444 -u
                                WALLET_ADDRESS.WORKER -p x
                                pause
                            </code>
                        </Card>
                    </Col> */}

                    <Col span={24}>
                        <Card
                            title="Settings for HiveOS"
                        >
                            <Space
                                direction="vertical"
                                size={24}
                                style={{ alignItems: "center", width: "100%" }}
                            >
                                <img src="https://i.imgur.com/MRvpc20.png" alt="Settings for Wild-rig Multi HiveOS"/>
                                <img src="https://i.imgur.com/erNsvAN.png" alt="Settings for SRBMiner Multi HiveOS"/>
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    )
}


export default ConnectPage