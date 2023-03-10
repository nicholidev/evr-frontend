import { Card, Col, List, message, Row, Space, Tooltip } from "antd";
import Container from "components/container";
import MainLayout from "layouts";
import { NextPage } from "next";
import Head from "next/head";
import { Icon } from "@iconify/react";

const data = [
    {
        light: "noto:green-circle",
        flag: "openmoji:flag-us-outlying-islands",
        label: "Pool Mining - USA East Coast",
        value: "us-east.evrpool.ninja:3333"
    },
    {
        flag: "openmoji:flag-us-outlying-islands",
        label: "SOLO Mining - USA East Coast",
        value: "solo.us-east.evrpool.ninja:5555"
    },
    {
        flag: "openmoji:flag-us-outlying-islands",
        label: "Pool Mining - USA West Coast",
        value: "us-west.evrpool.ninja:3030"
    },
    {
        flag: "openmoji:flag-us-outlying-islands",
        label: "SOLO Mining - USA West Coast",
        value: "solo.us-west.evrpool.ninja:5050"
    },
    {
        flag: "openmoji:flag-germany",
        label: "Pool Mining - Europe",
        value: "eu.evrpool.ninja:4040"
    },
    {
        flag: "openmoji:flag-germany",
        label: "SOLO Mining - Europe",
        value: "solo.eu.evrpool.ninja:6060"
    },
    {
        flag: "openmoji:flag-singapore",
        label: "Pool Mining - Asia",
        value: "asia.evrpool.ninja:7070"
    },
    {
        flag: "openmoji:flag-singapore",
        label: "SOLO Mining - Asia",
        value: "solo.asia.evrpool.ninja:9090"
    }
];

const ConnectPage: NextPage = () =>
{
    return (
        <MainLayout>
            <Head>
                <title>Connect</title>
                <meta name="description" content="EVRpool.ninja | Connect" />
                <link rel="icon" href="/favicon.ico" />
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
                                                <h5 className="table-title" style={{ marginBottom: 0 }}>
                                                    <Icon icon={item.flag} />
                                                    {item.label}
                                                </h5>
                                            </Col>


                                            <Col
                                                span={24}
                                                sm={{ span: 12 }}
                                            >
                                                <p style={{ marginBottom: 0, display: "inline-flex", alignItems: "center", gridGap: 4 }}>
                                                    {item.value}
                                                    <Tooltip
                                                        title="Copy to clipboard"
                                                        color="cyan"
                                                    >
                                                        <a
                                                            className="copy-link"
                                                            onClick={() =>
                                                            {
                                                                navigator.clipboard.writeText(item.value);
                                                                message.success({
                                                                    content: 'Copied to clipboard!',
                                                                    style: {
                                                                    },
                                                                });
                                                            }}
                                                        >
                                                            <Icon icon="ion:copy-outline" />
                                                        </a>
                                                    </Tooltip>
                                                </p>
                                            </Col>
                                        </Row>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>


                    <Col span={24}>
                        <Card
                            title="How can I set static difficulty?"
                        >
                            <p style={{ color: "#f0f0f0", fontSize: 18 }}>
                             Simply put <code>d=0.XX</code> in the password field of your miner software. Where <code>XX</code> is the difficulty value. For a single-gpu miner with 20 - 25 Mh/s <code>d=0.15</code> seems to be a good number. Unless you only have 1-2 GPU's there is no need to adjust thing number, unless you 100% know what you are doing. If you need advice please jump into our <a href="https://discord.gg/ZCzmChaDjX" target="_blank" rel="noreferrer" >Discord Server.</a>
                            </p>
                        </Card>
                    </Col>



                    <Col span={24}>
                        <Card
                            title="Settings for Wild-Rig Multi:"
                            className="scrollable"
                        >
                            <code>
                                wildrig.exe --algo evrprogpow --url stratum+tcp://us-east.evrpool.ninja:3333 --user WalletAddress.WorkerName --pass x
                            </code>
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card
                            title="Settings for evrProgPowMiner:"
                            className="scrollable"
                        >
                            <code>
                                evrprogpowminer.exe -P stratum+tcp://WalletAddress.WorkerName@us-east.evrpool.ninja:3333
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
                                <img src="https://i.imgur.com/MRvpc20.png" alt="Settings for Wild-rig Multi HiveOS" />
                                <img src="https://i.imgur.com/erNsvAN.png" alt="Settings for SRBMiner Multi HiveOS" />
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    )
}


export default ConnectPage
