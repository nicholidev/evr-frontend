import { Card, Col, Collapse, Row } from "antd";
import Container from "components/container";
import MainLayout from "layouts";
import { NextPage } from "next";
import Head from "next/head";
import { createNonNullChain } from "typescript";

const { Panel } = Collapse;

const data = [
    {
        title: "Why is my hashrate wrong on the pool Dashboard?",
        content: "Your hashrate is not wrong. Currently, we show your miners real-time hashrate. This is a limitation of the pool software and we are working on a fix that will show your hashrate average instead, which will more accurately reflect the hashrate you see displayed in your miner software. If you are ever in doubt, please rely on the hashrate displayed by your miner software."
    },    
    {
        title: "Can I Pool mine + SOLO mine at the same time?",
        content: "Yes! Just remember, you'll need to connect your rig to port 5555 for SOLO mining."
    },
    {
        title: "Does EVRpool.ninja support static mining difficulty?",
        content: "Yes, we do. Just enter d=x.xx in the PASSWORD field of your miner software; where x.xx equals the share difficulty you want. Example: d=0.1 - For more examples please see the Connect page."
    },
    {
        title: "Is EVRpool.ninja better for large farms or small miners?",
        content: "We support everyone. From the single GPU miner, to a large farm with 1,000 GPU's. If you are a large farm, we will even create a dedicated port for you and may even drop a stratum server closer to your location. Please Email Us or contact Luckyblocks in the Discord for more info."
    },
    {
        title: "Which Payment Scheme is used and why?",
        content: "For pool mining, we use PPLNT. SOLO miners are paid 100% of the block reward when/if they solve a block. PPLNT is similar to PPLNS payment schemes, but uses Round Time, instead of Round Shares. This rewards loyal miners, and strongly discourages 'Pool Hopping'. Currently, our time factor is set to 51%. This means that if you are mining for 51% or more of the round time, 100% of your shares will be paid. Your paid shares will only be reduced if spend less than 51% of time on a round. This makes it impossible for a large hashrate pool hopper to swoop onto this pool, get a lucky block, and then leave with a large amount of the block reward.(leaving only crumbs for loyal/constant miners)."
    },
    {
        title: "Does PPLNT make this a bad pool for large hashrate miners?",
        content: "No, not at all. EVRpool.ninja is an excellent choice for large and small miners alike. You are not punished for having a large hashrate. PPLNT punishes 'Pool Hoppers' who point a large amount of hashrate at a pool for quick bursts, hoping to catch a Lucky Round, then quickly disconnect; thereby taking a large amount of the block reward for doing very little work. Large farms that mine at EVRpool.ninja constantly do very well, and experience no share reductions."
    },
    {
        title: "When are miners paid?",
        content: "The pool payment processor runs every 10 minutes. Pool & SOLO miners with an owed balance will be paid every 10 minutes. Please keep in mind, the current minimum payout threshold is 50 EVR. If your balance is less than 50 EVR, then your balance will continue to accumulate until it exceeds 50 EVR."
    },
    {
        title: "I'm having trouble getting connected, how can I get help fast?",
        content: "The fastest way to get help is to jump into the pool Discord server. You can find the Discord invite link in the page header (Desktop) or at the bottom of the menu (on mobile)"
    },
    {
        title: "How much EVR per day/week/month will I earn?",
        content: "To make things easy, when you Pool Mine, we auto-calculate your Estimated Daily Earnings based on your real-time hashrate. You can check it any time on the Dashboard page."
    },
    {
        title: "How close am I to solving a SOLO block?",
        content: "As you know, mining is probabilistic in nature. Block-to-block, Luck can vary greatly. In a perfect world, you'd solve a block every time with 100% Effort. Sometimes you will be luckier, sometimes you will be less lucky. For your convenience, we calculate your SOLO Round Effort on your Dashboard page."
    },
    {
        title: "What is my Pending Balance?",
        content: "Pending Balance is simply the amount of EVR coins owed to you which are still waiting on network confirmations. After the network confirmation threshold is met, the coins will be paid out the next time the Pool Payment Processor runs. (every 10 minutes)."
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