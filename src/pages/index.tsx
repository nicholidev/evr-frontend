import { Card, Col, Grid, Row, Space, Statistic, Switch, Tooltip } from 'antd'
import Head from 'next/head'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import MainLayout from 'layouts'
import Container from 'components/container'
import { useEffect, useState } from 'react'
import { historicalApi, statisticApi } from "../api";
import { hashRateFormat } from 'utils/unit.helper'
import { getHoursMinutes, getTimeMinutes } from "../utils/time.helper";
import WithIcon from "../components/with-icon";

const { useBreakpoint } = Grid;


const HomePage = () =>
{
    const breakpoints = useBreakpoint();

    const [statistic, setStatistic] = useState<any>({})

    const [history, setHistory] = useState<any[]>([])

    const [t, setT] = useState(60);

    const [refresh, setRefresh] = useState<boolean>(false);

    const chartOptions = {
        chart: {
            height: 500,
            type: 'area',
            backgroundColor: 'rgba(255, 255, 255, 0.0)',
        },
        title: {
            text: 'Pool Hashrate',
            style: {
                color: '#ffffff',
                fontWeight: 'bold'
            }
        },
        xAxis: {
            categories: history.map((i) => getTimeMinutes(i.time)),
            labels: {
                style: {
                    color: '#f0f0f0'
                }
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                formatter: (e: any) =>
                {
                    return e.value + 'GH/s';
                },
                style: {
                    color: '#f0f0f0'
                }
            }
        },
        allowDecimals: false,
        accessibility: {
            rangeDescription: 'Range: 1940 to 2017.'
        },

        plotOptions: {
            area: {
                marker: {
                    enabled: true,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },

        series: [
            {
                name: 'Pool hashrate',
                data: history.map((i) => i.hashrate.shared / 1000000000),
                // color: '#9DC8F1',
                color: '#53D8FF',
                // color: '#ff908c',
            },
            {
                name: 'Solo hashrate',
                data: history.map((i) => i.hashrate.solo / 1000000000),
                color: '#9DC8F1',
                // color: '#a5d69c',
            }
        ]

    }

    const chartOptions2 = {
        chart: {
            type: 'line',
            height: breakpoints.xl ? 215 : 500,
            backgroundColor: 'rgba(255, 255, 255, 0.0)',
        },
        title: {
            text: 'Network Difficulty',
            style: {
                color: '#ffffff',
                fontWeight: 'bold'
            }
        },
        legend: { enabled: false },
        xAxis: {
            categories: history.map((i) => getTimeMinutes(i.time)),
            labels: {
                enabled: !breakpoints.xl,
                style: {
                    color: '#f0f0f0'
                }
            },
        },
        yAxis: {
            title: {
                text: ''
            },

            labels: {
                formatter: (e: any) =>
                {
                    return e.value / 1000 + 'k';
                },
                style: {
                    color: '#f0f0f0'
                }
            }
        },

        series: [{
            name: "",
            data: history.map((i) => i.network.difficulty)
        }]
    }

    const chartOptions3 = {
        chart: {
            type: 'area',
            height: breakpoints.xl ? 215 : 500,
            backgroundColor: 'rgba(255, 255, 255, 0.0)',
        },
        title: {
            text: `Pool Miners (${history[history.length-1]?.status.miners})`,
            style: {
                color: '#ffffff',
                fontWeight: 'bold'
            }
        },
        legend: { enabled: false },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                style: {
                    color: '#f0f0f0'
                }
            }
        },
        xAxis: {
            categories: history.map((i) => getTimeMinutes(i.time)),
            labels: {
                enabled: !breakpoints.xl,
                style: {
                    color: '#f0f0f0'
                }
            },
        },
        series: [
            {
                name: "",
                data: history.map((i) => i.status.miners)
            }
        ]
    }

    const chartOptions5 = {
        chart: {
            type: 'area',
            height: breakpoints.xl ? 215 : 500,
            backgroundColor: 'rgba(255, 255, 255, 0.0)',
        },
        title: {
            text: `Pool Workers (${history[history.length-1]?.status.workers})`,
            style: {
                color: '#ffffff',
                fontWeight: 'bold'
            }
        },
        legend: { enabled: false },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                style: {
                    color: '#f0f0f0'
                }
            }
        },
        xAxis: {
            categories: history.map((i) => getTimeMinutes(i.time)),
            labels: {
                enabled: !breakpoints.xl,
                style: {
                    color: '#f0f0f0'
                }
            },
        },
        series: [
            {
                name: "",
                data: history.map((i) => i.status.workers)
            }
        ]
    }

    const chartOption4 = {
        accessibility: { enabled: false },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: breakpoints.xl ? 215 : 500,
            backgroundColor: 'rgba(255, 255, 255, 0.0)',
        },
        title: {
            text: 'Network Dominance',
            style: {
                color: '#ffffff',
                fontWeight: 'bold'
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },

        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: !breakpoints.xl,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    connectorColor: '#f0f0f0',
                }
            }
        },
        series: [
            {
                name: 'Dominance',
                type: 'pie',
                data: [
                    { name: 'Network', y: statistic?.network?.hashrate, color: '#6590B9' },
                    { name: 'Pool', y: statistic?.hashrate?.shared, color: '#8CFF98' },
                ]
            }
        ]
    }


    useEffect(() =>
    {
        statisticApi()
            .then(({ data }) =>
            {
                setStatistic(data?.body?.primary)
            })
            .catch(e => console.log(e))
        historicalApi()
            .then(({ data }) =>
            {
                setHistory(data?.body?.primary)
            })
            .catch(e => console.log(e))
    }, [])

    const getHandle = () =>
    {
        statisticApi()
            .then(({ data }) =>
            {
                setStatistic(data?.body?.primary);
            })
            .catch(e => console.log(e))
        historicalApi()
            .then(({ data }) =>
            {
                setHistory(data?.body?.primary)
            })
            .catch(e => console.log(e))
        setT(60);
    }

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


    return (
        <MainLayout>
            <Head>
                <title>Home</title>
                <meta name="description" content="EVRpool.ninja - Evrmore Mining Pool + Solo Mining"/>
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
                        xl={{ span: 12 }}
                    >
                        <Card className="no-padding-card">
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={chartOptions}
                            />
                        </Card>
                    </Col>

                    <Col
                        span={24}
                        xl={{ span: 6 }}
                    >
                        <Space
                            direction="vertical"
                            size={24}
                            style={{ width: "100%" }}
                        >
                            <Card className="no-padding-card">
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={chartOptions2}
                                />
                            </Card>
                            <Card className="no-padding-card">
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={chartOptions3}
                                />
                            </Card>
                        </Space>
                    </Col>

                    <Col
                        span={24}
                        xl={{ span: 6 }}
                    >
                        <Space
                            direction="vertical"
                            size={24}
                            style={{ width: "100%" }}
                        >
                            <Card className="no-padding-card">
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={chartOption4}
                                />
                            </Card>
                            <Card className="no-padding-card">
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={chartOptions5}
                                />
                            </Card>
                        </Space>
                    </Col>

                    <Col
                        span={24}
                        sm={{ span: 12 }}
                        xl={{ span: 6 }}
                    >
                        <Card>
                            <WithIcon icon="fa6-solid:people-roof">
                                <Statistic
                                    title="Pool Hashrate"
                                    value={
                                        hashRateFormat(statistic?.hashrate?.shared || 0, 3, 'H/s')
                                    }
                                    valueStyle={{ color: '#FFFFFF' }}
                                />
                            </WithIcon>
                        </Card>
                    </Col>

                    <Col
                        span={24}
                        sm={{ span: 12 }}
                        xl={{ span: 6 }}
                    >
                        <Card>
                            <WithIcon icon="fa6-solid:hourglass-start">
                                <Statistic
                                    // title="Pool TTF"
                                    title={<Tooltip title="How long until the pool solves the next block, presuming 100% Effort." color="cyan"><span>TTF </span></Tooltip>}
                                    value={
                                        getHoursMinutes((statistic?.network?.hashrate / statistic?.hashrate?.shared) * 60)
                                    }
                                    valueStyle={{ color: '#FFFFFF' }}
                                />
                            </WithIcon>

                        </Card>
                    </Col>

                    <Col
                        span={24}
                        sm={{ span: 12 }}
                        xl={{ span: 6 }}
                    >
                        <Card>
                            <WithIcon icon="fa6-solid:timeline">
                                <Statistic
                                    title="Pool Round Shares"
                                    value={
                                        statistic?.shares?.valid
                                    }
                                    valueStyle={{ color: '#FFFFFF' }}
                                />
                            </WithIcon>
                        </Card>
                    </Col>

                    <Col
                        span={24}
                        sm={{ span: 12 }}
                        xl={{ span: 6 }}
                    >
                        <Card>
                            <WithIcon icon="fa6-solid:person-digging">
                                <Statistic
                                    // title="Pool Round Effort"
                                    title={<Tooltip title="Effort is a measure of how many hashes our pool made to find a block. Please see FAQ for more info."color="cyan"><span>Pool Round Effort</span></Tooltip>}
                                    precision={2}
                                    value={
                                        statistic?.status?.effort
                                    }
                                    valueStyle={{ color: '#FFFFFF' }}
                                    suffix="%"
                                />
                            </WithIcon>
                        </Card>
                    </Col>

                    <Col
                        span={24}
                        sm={{ span: 12 }}
                        xl={{ span: 6 }}
                    >
                        <Card>
                            <WithIcon icon="fa6-solid:user">
                                <Statistic
                                    title="SOLO Hashrate"
                                    value={
                                        hashRateFormat(statistic?.hashrate?.solo || 0, 3, 'H/s')
                                    }
                                    valueStyle={{ color: '#FFFFFF' }}
                                />
                            </WithIcon>
                        </Card>
                    </Col>

                    <Col
                        span={24}
                        sm={{ span: 12 }}
                        xl={{ span: 6 }}
                    >
                        <Card>
                            <WithIcon icon="fa6-solid:hand-holding-dollar">
                                <Statistic
                                    title="Pool Fee"
                                    precision={2}
                                    value={
                                        (statistic?.config?.recipientFee || 0) * 100
                                    }
                                    valueStyle={{ color: '#FFFFFF' }}
                                    suffix="%"
                                />
                            </WithIcon>
                        </Card>
                    </Col>

                    <Col
                        span={24}
                        sm={{ span: 12 }}
                        xl={{ span: 6 }}
                    >
                        <Card>
                            <WithIcon icon="fa6-solid:bars-progress">
                                <Statistic
                                    title="Pool Minimum Payment"
                                    precision={0}
                                    value={
                                        (statistic?.config?.minPayment || 0)
                                    }
                                    valueStyle={{ color: '#FFFFFF' }}
                                    suffix="EVR"
                                />
                            </WithIcon>
                        </Card>
                    </Col>

                    <Col
                        span={24}
                        sm={{ span: 12 }}
                        xl={{ span: 6 }}
                    >
                        <Card>
                            <WithIcon icon="fa6-solid:clock">
                                <Statistic
                                    title="Pool Payment Interval"
                                    precision={0}
                                    value={
                                        (statistic?.config?.paymentInterval || 0) / 60
                                    }
                                    valueStyle={{ color: '#FFFFFF' }}
                                    suffix="MINS"
                                />
                            </WithIcon>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    )
}


export default HomePage
