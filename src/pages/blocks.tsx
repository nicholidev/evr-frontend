import { Card, Col, Grid, Progress, Row, Segmented, Space, Statistic, Switch, Table, Tag } from "antd";
import { blocksApi, luckApi, validBlocksApi } from "api";
import Container from "components/container";
import MainLayout from "layouts";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { getTimeFormat } from "utils/time.helper";
import Head from "next/head";
import WithIcon from "components/with-icon";

const { useBreakpoint } = Grid;


const BlocksPage: NextPage = () =>
{
    const breakpoints = useBreakpoint();

    const [confirmed, setConfirmed] = useState<any[]>([]);

    const [kicked, setKicked] = useState<any[]>([]);

    const [pending, setPending] = useState<any[]>([]);

    const [luck, setLuck] = useState<any>({});

    const [blocks, setBlocks] = useState<any>({});

    const [network, setNetwork] = useState<any>({});

    const [current, setCurrent] = useState<"confirmed" | "pending" | "kicked">("confirmed");

    const [t, setT] = useState(60);

    const [refresh, setRefresh] = useState<boolean>(false);


    const getHandle = () =>
    {
        blocksApi()
            .then(({ data }) =>
            {
                const dat = data?.body?.primary;
                setConfirmed(dat?.confirmed?.map((i: any) =>
                {
                    i.key = i.transaction;
                    i.percent = 100;
                    return i
                }));
                setKicked(dat?.kicked?.map((i: any) =>
                {
                    i.key = i.transaction;
                    i.percent = "kicked";
                    return i
                }));
                setPending(dat?.pending?.map((i: any) =>
                {
                    i.key = i.transaction;
                    return i
                }));
            })
            .catch(e => console.log(e))

        luckApi()
            .then(({ data }) =>
            {
                setLuck(data?.body?.primary?.status?.luck)
            })
            .catch(e => console.log(e))

        validBlocksApi()
            .then(({ data }) =>
            {
                setBlocks(data?.body?.primary?.blocks)
                setNetwork(data?.body?.primary?.network)
            })
            .catch(e => console.log(e))
    }


    useEffect(() =>
    {
        getHandle();
    }, [])

    useEffect(() =>
    {
        if (refresh)
        {
            const interval = setInterval(() =>
            {
                setT(t-1)
            }, 1000);

            if (t<1)
            {
                getHandle();
                setT(60)
            }
            return () => clearInterval(interval);

        }
        else
        {
            setT(30)
        }
    }, [t, refresh])

    const columns: any[] = [
        {
            title: 'Height',
            dataIndex: 'height',
            align: "center",
            render: (i: string | number) =>
            {
                return (
                    <a href={`https://evr.cryptoscope.io/block/?blockheight=${i}`} target="_blank" rel="noreferrer">
                        {i}
                    </a>
                )
            }
        },
        {
            title: 'Time',
            dataIndex: 'time',
            align: "center",
            render: (time: number) =>
            {
                return (
                    <span>{getTimeFormat(time)}</span>
                )
            }
        },
        {
            title: 'Worker',
            align: "left",
            render: (row: any) =>
            {
                return (
                    <Space>
                        {row.worker}
                        {
                            row.solo && <Tag color="blue">Solo</Tag>
                        }
                    </Space>
                )
            },
        },
        {
            title: 'Server',
            dataIndex: 'identifier',
        },
        {
            title: 'Luck',
            dataIndex: 'luck',
            align: "center",
            render: (i: number) => (
                <span
                    style={{
                        color: i < 100 ? '#28a745' : i < 119 ? '#ffc107' : '#dc3545'
                    }}
                >
                    <b>{i.toFixed(2)} %</b>
                </span>
            )
        },
        {
            title: 'Difficulty',
            dataIndex: 'difficulty',
            align: "center",
            render: (i: number) => i.toFixed(2)
        },
        {
            title: 'Reward',
            dataIndex: 'reward',
            align: "center",
            render: (i: number) => ((i / 100000000) - (i / 1000000000)).toFixed(2)
        },
        {
            title: 'Status',
            width: 150,
            align: "center",
            render: (i: any) =>
            {
                return (
                    i.percent === 'kicked' ? (
                        <Tag
                            color="#ff0000"
                            style={{ marginRight: 0 }}
                        >
                            <b>KICKED</b>
                        </Tag>
                    ) : (
                        <Progress
                            percent={i.percent || ((network.height - i.height) > 99 ? 99 : (network.height - i.height))}
                            showInfo={true}
                            strokeColor={{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                            }}
                        />
                    )
                )
            }
        },
    ];


    return (
        <MainLayout>
            <Head>
                <title>Blocks</title>
                <meta name="description" content="EVRpool.ninja | Blocks"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Container>

                <Row
                    gutter={[24, 24]}
                >
                    <Col span={24}>
                        <div
                            className="refresh-area"
                        >
                            {
                                refresh ? `${t}s` : "Auto Refresh"
                            }
                            <Switch
                                checked={refresh}
                                onChange={(e)=>{setRefresh(e); setT(60)}}
                            />
                        </div>
                    </Col>
                    <Col
                        span={24}
                        lg={{ span: 8 }}
                    >
                        <Card>
                            <WithIcon icon="fa:check-circle">
                                <Statistic
                                    title="Valid Blocks"
                                    value={blocks?.valid || 0}
                                    precision={0}
                                    valueStyle={{ color: '#3f8600' }}
                                // prefix={<ArrowUpOutlined />}
                                />
                            </WithIcon>
                        </Card>
                    </Col>
                    <Col
                        span={24}
                        lg={{ span: 8 }}
                    >
                        <Card>
                            <WithIcon icon="fa:clock-o">
                                <Statistic
                                    title="Luck10"
                                    value={luck.luck10 || 0}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    // prefix={<ArrowUpOutlined />}
                                    suffix="%"
                                />
                            </WithIcon>
                        </Card>
                    </Col>
                    <Col
                        span={24}
                        lg={{ span: 8 }}
                    >
                        <Card>
                            <WithIcon icon="fa6-solid:clock-rotate-left">
                                <Statistic
                                    title="Luck100"
                                    value={luck.luck100 || 0}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    // prefix={<ArrowUpOutlined />}
                                    suffix="%"
                                />
                            </WithIcon>
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card>
                            <Segmented
                                block
                                size="large"
                                value={current}
                                onChange={(e: any) =>
                                {
                                    setCurrent(e)
                                }}
                                options={[
                                    {
                                        value: "confirmed",
                                        label: <b>Confirmed</b>
                                    },
                                    {
                                        value: "pending",
                                        label: <b>Pending</b>
                                    },
                                    {
                                        value: "kicked",
                                        label: <b>Kicked</b>
                                    },
                                ]}
                            />
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Table
                            columns={columns}
                            dataSource={{
                                'confirmed': confirmed.slice(0, 50),
                                'kicked': kicked.slice(0, 50),
                                'pending': pending.slice(0, 50),
                            }[current || "confirmed"]}
                            pagination={false}
                            size={
                                breakpoints.md ? "middle" : "small"
                            }
                            scroll={{ x: '1200px' }}
                        />
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    )
}


export default BlocksPage
