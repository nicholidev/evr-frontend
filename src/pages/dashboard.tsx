import { Card, Col, Grid, Input, Row, Segmented, Statistic, Table } from "antd";
import Container from "components/container";
import MainLayout from "layouts";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { allMinersApi, minersApi, statisticApi, validBlocksApi, workersApi } from "api";
import { hashRateFormat } from "utils/unit.helper";
import Head from "next/head";
import WithIcon from "../components/with-icon";
import { useRouter } from "next/router";


const { Search } = Input;
const { useBreakpoint } = Grid;

const DashboardPage: NextPage = () => 
{
    const { query }: any = useRouter();

    const breakpoints = useBreakpoint();
    const [current, setCurrent] = useState<any>("shared");
    const [miner, setMiner] = useState<any>({});
    const [workers, setWorkers] = useState<any[]>([]);
    const [solos, setSolos] = useState<any[]>([]);
    const [activeSolos, setActiveSolos] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [pool, setPool] = useState<any>({});

    const columns: any[] = [
        {
            title: current === "solo" ? "Solo Worker" : "Worker Name",
            dataIndex: "worker",
        },
        {
            title: "Worker Hashrate",
            align: "center",
            render: (i: any) => 
            {
                return (
                    <span>
                        {
                            current === 'solo' ?
                                hashRateFormat(i.hashrate?.solo, 3, "H/s") :
                                hashRateFormat(i.hashrate?.shared, 3, "H/s")
                        }
                    </span>
                )
            }
        },
        // {
        //     title: "Work",
        //     align: "center",
        //     render: (i: any) => (current === 'solo' ? i.work?.solo : i.work?.shared).toFixed(0)
        // },
        {
            title: "Valid",
            align: "center",
            render: (i: any) => (current === 'solo' ? i.shares?.solo?.valid : i.shares?.shared?.valid).toFixed(0)
        },
        {
            title: "Invalid",
            align: "center",
            render: (i: any) => (current === 'solo' ? i.shares?.solo?.invalid : i.shares?.shared?.invalid).toFixed(0)
        },
        {
            title: "Stale",
            align: "center",
            render: (i: any) => (current === 'solo' ? i.shares?.solo?.stale : i.shares?.shared?.stale).toFixed(0)
        },
    ];


    const loadSharedData = async (w: string) => 
    {
        return minersApi(w)
            .then(({ data }) => 
            {
                console.log(data?.body?.primary?.workers?.shared?.length)
                if (data?.body?.primary?.workers?.shared?.length > 0) 
                {
                    return Promise.all(
                        data?.body?.primary?.workers?.shared?.map(async (m: any, index: number) => 
                        {
                            const w = await workersApi(m);
                            return {
                                index: index + 1,
                                key: m,
                                worker: m,
                                ...w?.data?.body?.primary
                            }
                        })
                    )
                }
                else 
                {
                    return []
                }
            })
            .catch(e => console.log(e))
    }

    const loadSoloData = async (w: string) => 
    {
        return minersApi(w)
            .then(({ data }) => 
            {
                setMiner({
                    ...data?.body?.primary,
                    miner: w
                })
                console.log(data?.body?.primary?.workers?.solo?.length)
                if (data?.body?.primary?.workers?.solo?.length > 0) 
                {
                    return Promise.all(
                        data?.body?.primary?.workers?.solo?.map(async (m: any, index: number) => 
                        {
                            const w = await workersApi(m);
                            return {
                                index: index + 1,
                                key: m,
                                worker: m,
                                ...w?.data?.body?.primary
                            }
                        })
                    )
                }
                else 
                {
                    return []
                }
            })
            .catch(e => console.log(e))
    }

    const onSearch = (e: string) => 
    {
        setLoading(true);
        loadSharedData(e)
            .then((res: any) => 
            {
                setWorkers(res.sort((a: any, b: any) => b.hashrate?.shared - a.hashrate?.shared))
            })
            .catch(e => 
            {
                console.log(e)
            })
            .finally(() => setLoading(false))

        loadSoloData(e)
            .then((res: any) => 
            {
                setSolos(res.sort((a: any, b: any) => b.hashrate?.solo - a.hashrate?.solo))
            })
            .catch(e => 
            {
                console.log(e)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => 
    {
        validBlocksApi()
            .then(({ data }) => 
            {
                setPool(data?.body?.primary);
            })
            .catch(e => console.log(e))
        allMinersApi()
            .then(({ data }) => 
            {
                setActiveSolos(data.body?.primary?.solo)
            })
    }, [])

    useEffect(() => 
    {
        if (query?.miner) 
        {
            onSearch(query.miner);
        }
    }, [query])


    console.log(miner, "MINER")
    console.log(pool, "POOL")

    return (
        <MainLayout>
            <Head>
                <title>Dashboard</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Container>
                <Row
                    gutter={[24, 24]}
                >

                    <Col span={24}>
                        <Card>
                            <Search
                                placeholder="Wallet Address"
                                allowClear
                                enterButton="Search"
                                size="large"
                                onSearch={onSearch}
                                loading={loading}
                            />
                        </Card>
                    </Col>

                    <Col span={24}>
                        <Card>
                            <Segmented
                                block
                                options={[
                                    {
                                        label: "Shared",
                                        value: "shared"
                                    },
                                    {
                                        label: "Solo",
                                        value: "solo"
                                    }
                                ]}
                                value={current}
                                onChange={setCurrent}
                            />
                        </Card>
                    </Col>

                    <Col
                        span={24}
                        lg={{ span: 12 }}
                    >
                        <Card>
                            <WithIcon icon="fa6-solid:chart-simple">
                                <Statistic
                                    title="Hashrate"
                                    value={hashRateFormat(miner.hashrate?.[current] || 0, 3, "H/s")}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}

                                />
                            </WithIcon>
                        </Card>
                    </Col>
                    <Col
                        span={24}
                        lg={{ span: 12 }}
                    >
                        <Card>
                            <WithIcon icon="fa:sitemap">
                                <Statistic
                                    title="Workers"
                                    value={
                                        current === 'solo' ?
                                            solos.filter((i) => i?.hashrate?.solo > 0).length :
                                            workers.filter((i) => i?.hashrate?.shared > 0).length
                                    }
                                    precision={0}
                                    valueStyle={{ color: '#3f8600' }}
                                />
                            </WithIcon>
                        </Card>
                    </Col>
                    <Col
                        span={24}
                        lg={{ span: 8 }}
                    >
                        <Card>
                            <WithIcon icon="fa6-regular:hourglass-half">
                                <Statistic
                                    title="Pending"
                                    value={miner.payments?.immature || 0}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix="EVR"
                                />
                            </WithIcon>
                        </Card>
                    </Col>
                    <Col
                        span={24}
                        lg={{ span: 8 }}
                    >
                        <Card>
                            <WithIcon icon="fa6-solid:sack-dollar">
                                <Statistic
                                    title="Paid"
                                    value={miner.payments?.paid || 0}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    suffix="EVR"
                                />
                            </WithIcon>
                        </Card>
                    </Col>
                    {
                        current !== 'solo' ? (
                            <Col
                                span={24}
                                lg={{ span: 8 }}
                            >
                                <Card>
                                    <WithIcon icon="fa6-solid:magnifying-glass-dollar">
                                        <Statistic
                                            title="Daily Estimated Earnings"
                                            value={
                                                1 / (pool?.network?.hashrate || 0) * (miner?.hashrate?.[current] || 0) * (2500.20 * 86400 / 60)
                                            }
                                            precision={2}
                                            valueStyle={{ color: '#3f8600' }}
                                            suffix="EVR"
                                        />
                                    </WithIcon>
                                </Card>
                            </Col>
                        ) : (
                            <Col
                                span={24}
                                lg={{ span: 8 }}
                            >
                                <Card>
                                    <WithIcon icon="fa6-solid:person-digging">
                                        <Statistic
                                            title="Solo Effort"
                                            value={
                                                activeSolos.filter((i) => i.miner === miner.miner)?.[0]?.effort || 0
                                            }
                                            precision={2}
                                            // prefix={<ArrowUpOutlined />}
                                            suffix="%"
                                        />
                                    </WithIcon>
                                </Card>
                            </Col>
                        )
                    }

                    <Col span={24}>
                        <Card>
                            <Table
                                columns={columns}
                                dataSource={current === "solo" ? solos : workers}
                                pagination={false}
                                size={
                                    breakpoints.md ? "middle" : "small"
                                }
                                scroll={{ x: '800px' }}
                            />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    )
}


export default DashboardPage