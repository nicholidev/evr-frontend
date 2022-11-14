import { Card, Col, Input, Row, Segmented, Statistic, Table } from "antd";
import Container from "components/container";
import MainLayout from "layouts";
import { NextPage } from "next";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState } from "react";
import { minersApi, workersApi } from "api";
import { hashRateFormat } from "utils/unit.helper";


const { Search } = Input

const DashboardPage: NextPage = () => {
    const [current, setCurrent] = useState<any>("shared");
    const [miner, setMiner] = useState<any>({});
    const [workers, setWorkers] = useState<any[]>([]);
    const [solos, setSolos] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const chartOptions = {
        title: {
            text: 'My chart'
        },
        series: [{
            data: [1, 2, 3]
        }]
    }


    const columns: any[] = [
        {
            title: current === "solo" ? "Solo Worker" : "Worker Name",
            dataIndex: "worker",
        },
        {
            title: "Worker Hashrate",
            align: "right",
            sorter: (a: any, b: any) => b.hashrate?.shared - a.hashrate?.shared,
            render: (i: any) => {
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
        {
            title: "Work",
            render: (i: any) => (current === 'solo' ? i.work?.solo : i.work?.shared).toFixed(0)
        },
        {
            title: "Valid",
            render: (i: any) => (current === 'solo' ? i.shares?.solo?.valid : i.shares?.shared?.valid).toFixed(0)
        },
        {
            title: "Invalid",
            render: (i: any) => (current === 'solo' ? i.shares?.solo?.invalid : i.shares?.shared?.invalid).toFixed(0)
        },
        {
            title: "Stale",
            render: (i: any) => (current === 'solo' ? i.shares?.solo?.stale : i.shares?.shared?.stale).toFixed(0)
        },
    ];


    const loadSharedData = async (w: string) => {
        return minersApi(w)
            .then(({ data }) => {
                console.log(data?.body?.primary?.workers?.shared?.length)
                if (data?.body?.primary?.workers?.shared?.length > 0) {
                    return Promise.all(
                        data?.body?.primary?.workers?.shared?.map(async (m: any, index: number) => {
                            const w = await workersApi(m);
                            return {
                                index: index + 1,
                                key: m,
                                worker: m,
                                ...w?.data?.body?.primary
                            }
                        })
                    )
                } else {
                    return []
                }
            })
            .catch(e => console.log(e))
    }

    const loadSoloData = async (w: string) => {
        return minersApi(w)
            .then(({ data }) => {
                setMiner(data?.body?.primary)
                console.log(data?.body?.primary?.workers?.solo?.length)
                if (data?.body?.primary?.workers?.solo?.length > 0) {
                    return Promise.all(
                        data?.body?.primary?.workers?.solo?.map(async (m: any, index: number) => {
                            const w = await workersApi(m);
                            return {
                                index: index + 1,
                                key: m,
                                worker: m,
                                ...w?.data?.body?.primary
                            }
                        })
                    )
                } else {
                    return []
                }
            })
            .catch(e => console.log(e))
    }

    const onSearch = (e: string) => {
        setLoading(true);
        loadSharedData(e)
            .then((res: any) => {
                setWorkers(res.sort((a: any, b: any) => b.hashrate?.shared - a.hashrate?.shared))
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => setLoading(false))

        loadSoloData(e)
            .then((res: any) => {
                setSolos(res.sort((a: any, b: any) => b.hashrate?.solo - a.hashrate?.solo))
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => setLoading(false))
    }


    console.log(solos)
    console.log(workers)
    console.log(miner)

    return (
        <MainLayout>
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
                    {/* <Col span={12}>
                        <Card>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={chartOptions}
                            />
                        </Card>
                   </Col>  */}
                    <Col span={12}>
                        <Card>
                            <Statistic
                                title="Hashrate"
                                value={hashRateFormat(miner.hashrate?.[current] || 0, 3, "H/s")}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                // prefix={<ArrowUpOutlined />}
                                // suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Statistic
                                title="Workers"
                                value={
                                    current === 'solo' ? 
                                        solos.filter((i) => i?.hashrate?.solo > 0).length :
                                        workers.filter((i) => i?.hashrate?.shared > 0).length
                                }
                                precision={0}
                                valueStyle={{ color: '#3f8600' }}
                                // prefix={<ArrowUpOutlined />}
                                // suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Pending"
                                value={miner.payments?.immature || 0}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                // prefix={<ArrowUpOutlined />}
                                suffix="EVR"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Paid"
                                value={miner.payments?.paid || 0}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                // prefix={<ArrowUpOutlined />}
                                suffix="EVR"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Estimated Earnings"
                                value={"coming"}
                                precision={0}
                                valueStyle={{ color: '#3f8600' }}
                                // prefix={<ArrowUpOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>

                    <Col span={24}>
                        <Card>

                            <Table
                                columns={columns}
                                dataSource={current === "solo" ? solos : workers}
                            />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    )
}


export default DashboardPage