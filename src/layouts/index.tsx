import { Button, Col, Layout, Menu, message, Row, Space, Tooltip } from "antd";
import { FC } from "react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";

const { Header, Content, Footer } = Layout;


interface Props {
    children?: any;
}

const MainLayout: FC<Props> = (props) => 
{
    const { children } = props;

    const router: any = useRouter();

    const clickHandle = (e: any) =>
    {
        if(e.key === 'exchange')
        {
            return window.open(
                'https://coinswap.ninja/',
                '_blank' // <- This is what makes it open in a new window.
            );
        }

        return router.push(`/${e.key}`)
    }

    return (
        <Layout >
            <Header>
                <Row justify="space-between" align="middle">
                    <Col span={2}>
                        <div onClick={()=>{router.push("/")}} style={{ cursor: "pointer" }}>
                            <img src="/logo.png" width={100} height={100} alt=""/>
                        </div>
                    </Col>
                    <Col span={18}>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={router.asPath.split("/")}
                            onClick={clickHandle}
                            items={[
                                {
                                    key: "dashboard",
                                    label: `Dashboard`,
                                },
                                {
                                    key: "exchange",
                                    label: `Exchange`,
                                },
                                {
                                    key: "miners",
                                    label: `Miners`,
                                },
                                {
                                    key: "blocks",
                                    label: `Blocks`,
                                },
                                {
                                    key: "payments",
                                    label: `Payments`,
                                },
                                {
                                    key: "connect",
                                    label: `Connect`,
                                },
                                {
                                    key: "faq",
                                    label: `Faq`,
                                },
                            ]}
                        />
                    </Col>
                    <Col style={{ alignItems: "center", display: "flex" }}>
                        <div className="social-area">
                            <Button
                                type="primary"
                                size="large"
                                className="social-button"
                                href="mailto:support@ravenpool.ninja?subject=EVRPool.ninja: EVR Mining Support Request" title="Send us an E-Mail!"
                            >
                                <Icon icon="ic:sharp-email"/>
                            </Button>
                            <Button
                                type="primary"
                                size="large"
                                className="social-button"
                                href="https://discord.gg/hQNyqn3ksh"
                                target="_blank"
                            >
                                <Icon icon="ic:baseline-discord"/>
                            </Button>
                        </div>
                    </Col>
                </Row>

            </Header>
            <Content style={{ paddingTop: "32px", paddingBottom: "52px", minHeight: "calc(100vh - 100px)" }}>
                { children }
            </Content>
            <Footer>
                <Row
                    justify="space-between"
                    align="middle"
                >
                    <Col>
                        <div className="footer-logo-area" onClick={()=>{router.push("/")}} style={{ cursor: "pointer" }}>
                            <img src="/logo-light.png" width={180} height={180} alt=""/>
                            <div>
                                <h1>
                                    EVRPool.Ninja
                                </h1>
                                <p>
                                    EVRmore Coin Mining Pool + SOLO Mining
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="donation-area">
                            EdKzRvrSYTPDVvR3eadfhTQNVbQxsUnMGk
                            <Tooltip placement="topLeft" title="Copy to clipboard">
                                <Button
                                    onClick={() => 
                                    {
                                        navigator.clipboard.writeText("EdKzRvrSYTPDVvR3eadfhTQNVbQxsUnMGk");
                                        message.success({
                                            content: 'The donation address was copied to your clipboard!',
                                            style: {
                                            },
                                        });
                                    }}
                                >
                                    <Icon icon="mdi:donation-outline"/> Donations
                                </Button>
                            </Tooltip>
                        </div>
                    </Col>
                </Row>
            </Footer>
            <div className="copyright">
                ©Copyright {new Date().getFullYear()} EVRpool.ninja All Rights Reserved.
            </div>
        </Layout >
    )
}


export default MainLayout