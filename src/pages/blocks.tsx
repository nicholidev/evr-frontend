import { Card, Col, Progress, Row, Segmented, Space, Statistic, Table, Tag } from "antd";
import { blocksApi, luckApi, validBlocksApi } from "api";
import Container from "components/container";
import MainLayout from "layouts";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { getTimeFormat } from "utils/time.helper";


const BlocksPage: NextPage = () => 
{

    const [confirmed, setConfirmed] = useState<any[]>([]);

    const [kicked, setKicked] = useState<any[]>([]);

    const [pending, setPending] = useState<any[]>([]);

    const [luck, setLuck] = useState<any>({});

    const [blocks, setBlocks] = useState<any>({});

    const [network, setNetwork] = useState<any>({});

    const [current, setCurrent] = useState<"confirmed" | "pending" | "kicked">("confirmed");


    useEffect(() => 
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
    }, [])


    const columns: any[] = [
        {
            title: 'Height',
            dataIndex: 'height',
            align: "center",
            width: 200,
        },
        {
            title: 'Time',
            dataIndex: 'time',
            align: "center",
            width: 200,
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
                            row.solo && <Tag color="purple">Solo</Tag>
                        }
                    </Space>
                )
            },
        },
        {
            title: 'Luck',
            dataIndex: 'luck',
            align: "center",
            width: 200,
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
            width: 200,
            align: "center",
            render: (i: number) => i.toFixed(2)
        },
        {
            title: 'Reward',
            dataIndex: 'reward',
            width: 200,
            align: "center",
            render: (i: number) => ((i / 100000000) - (i / 1000000000)).toFixed(2)
        },
        {
            title: 'Status',
            width: 200,
            align: "center",
            render: (i: any) => 
            {
                return (
                    i.percent === 'kicked' ? (
                        <Tag
                            color="#ff0000"
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


    console.log(network);
    console.log(pending)

    return (
        <MainLayout>
            <Container>

                <Row
                    gutter={[24, 24]}
                >
                    <Col
                        span={8}
                    >
                        <Card>
                            <Statistic
                                title="Valid Blocks"
                                value={blocks?.valid || 0}
                                precision={0}
                                valueStyle={{ color: '#3f8600' }}
                                // prefix={<ArrowUpOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col
                        span={8}
                    >
                        <Card>
                            <Statistic
                                title="Luck10"
                                value={luck.luck10 || 0}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                // prefix={<ArrowUpOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col
                        span={8}
                    >
                        <Card>
                            <Statistic
                                title="Luck100"
                                value={luck.luck100 || 0}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                // prefix={<ArrowUpOutlined />}
                                suffix="%"
                            />
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
                        />
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    )
}


export default BlocksPage