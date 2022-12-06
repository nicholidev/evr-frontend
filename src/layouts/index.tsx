import { Button, Col, Drawer, Grid, Layout, Menu, message, Row, Space, Tooltip } from "antd";
import { FC, useState } from "react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";

const { Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;


interface Props {
    children?: any;
}

const Menus: any = ({ breakpoints, clickHandle, router }: any) => 
{

    return (
        <Menu
            theme="dark"
            mode={breakpoints.xl ? "horizontal" : "vertical"}
            selectedKeys={!!router.asPath.split("/")[1] ? router.asPath.split("/") : ['home']}
            onClick={clickHandle}
            items={[
                {
                    key: "home",
                    label: `Home`,
                },
                {
                    key: "dashboard",
                    label: `Dashboard`,
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
                {
                    key: "exchange",
                    label: `Exchange`,
                },
            ]}
        />
    )
}

const MainLayout: FC<Props> = (props) => 
{
    const { children } = props;

    const breakpoints = useBreakpoint();

    const router: any = useRouter();

    const [mn, setMn] = useState(false);

    const clickHandle = (e: any) => 
    {
        if (e.key === 'exchange') 
        {
            return window.open(
                'https://coinswap.ninja/',
                '_blank' // <- This is what makes it open in a new window.
            );
        }
        if (e.key === 'home')
        {
            return router.push(`/`)
        }

        return router.push(`/${e.key}`)
    }


    return (
        <Layout>
            <Header>
                <div className="logo-area">
                    <div
                        onClick={() => 
                        {
                            router.push("/")
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        <img
                            src="/logo.png"
                            width={100}
                            height={100}
                            alt=""
                        />
                    </div>

                    {
                        breakpoints.xl && (
                            <Menus
                                breakpoints={breakpoints}
                                clickHandle={clickHandle}
                                router={router}
                            />
                        )
                    }
                </div>

                {
                    breakpoints.xl && (
                        <div className="social-area">
                            <Button
                                type="primary"
                                size="large"
                                className="social-button"
                                href="mailto:support@ravenpool.ninja?subject=EVRPool.ninja: EVR Mining Support Request"
                                title="Send us an E-Mail!"
                            >
                                <Icon icon="ic:sharp-email"/>
                            </Button>
                            <Button
                                type="primary"
                                size="large"
                                className="social-button"
                                href="https://discord.gg/ZCzmChaDjX"
                                target="_blank"
                            >
                                <Icon icon="ic:baseline-discord"/>
                            </Button>
                        </div>
                    )
                }

                {
                    !breakpoints.xl && (
                        <div>
                            <Button
                                type="primary"
                                size="large"
                                shape="circle"
                                className="hamburger-btn"
                                onClick={()=>{setMn(true)}}
                            >
                                <Icon icon="ci:hamburger"/>
                            </Button>
                        </div>
                    )
                }

                <Drawer
                    open={mn}
                    closeIcon={<Icon icon="material-symbols:close"/>}
                    onClose={()=>{setMn(false)}}
                    width={450}
                >
                    <Menus
                        breakpoints={breakpoints}
                        clickHandle={clickHandle}
                        router={router}
                    />
                    <div className="social-area-menu">
                        <Button
                            type="primary"
                            size="large"
                            href="mailto:support@ravenpool.ninja?subject=EVRPool.ninja: EVR Mining Support Request"
                            title="Send us an E-Mail!"
                        >
                            <Icon icon="ic:sharp-email"/>
                        </Button>
                        <Button
                            type="primary"
                            size="large"
                            href="https://discord.gg/hQNyqn3ksh"
                            target="_blank"
                        >
                            <Icon icon="ic:baseline-discord"/>
                        </Button>
                    </div>
                </Drawer>
            </Header>

            <Content style={{ paddingTop: breakpoints.sm ? 32: 20, paddingBottom: "52px", minHeight: "calc(100vh - 100px)" }}>
                { children }
            </Content>

            <Footer>
                <Row
                    justify="space-between"
                    align="middle"
                    gutter={[32, 32]}
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
                                <p>
                                    Fully compatible with
                                    
                                    <a href="https://www.miningrigrentals.com/register?ref=2697341" target="_blank"> 
                                        <img src="/mrr-logo-no-padding.png" alt="Mining Rig Rentals" />
                                    </a>
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
        </Layout>
    )
}


export default MainLayout