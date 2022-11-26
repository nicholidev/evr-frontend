import { Card, Col, Collapse, Row } from "antd";
import Container from "components/container";
import MainLayout from "layouts";
import { NextPage } from "next";
import Head from "next/head";

const { Panel } = Collapse;

const data = [
    {
        title: "Why is my hashrate wrong on the pool Dashboard?",
        content: "Your hashrate is not wrong. Currently, we show your miners real-time hashrate. This is a limitation of the pool software and we are working on a fix that will show your hashrate average instead, which will more accurately reflect the hashrate you see displayed in your miner software. If you are ever in doubt, please rely on the hashrate displayed by your miner software."
    },    
    {
        title: "Coming Soon",
        content: "Coming soon..."
    },
    {
        title: "Coming Soon",
        content: "Coming soon..."
    }
]

const FaqPage: NextPage = () => 
{
    const onChange = (key: string | string[]) => 
    {
        console.log(key);
    };

    return (
        <MainLayout>
            <Head>
                <title>Faq</title>
                <meta name="description" content="EVRpool.ninja | FAQ"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Container>
                <h1 className="page-title">Frequently asked questions</h1>
                <Row
                    gutter={[24, 32]}
                >
                    <Col span={24}>
                        <Card>
                            <Collapse defaultActiveKey={[0]} onChange={onChange}>
                                {
                                    data.map((i, index) => (
                                        <Panel header={i.title} key={index}>
                                            <p>{i.content}</p>
                                        </Panel>
                                    ))
                                }
                            </Collapse>
                        </Card>
                    </Col>

                </Row>
            </Container>
        </MainLayout>
    )
}


export default FaqPage