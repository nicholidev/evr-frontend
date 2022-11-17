import { Button, Card, Col, Divider, Row, Space, Statistic, Switch } from 'antd'
import Head from 'next/head'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import MainLayout from 'layouts'
import Container from 'components/container'
import { useEffect, useState } from 'react'
import { historicalApi, statisticApi } from "../api";
import { hashRateFormat } from 'utils/unit.helper'
import { getHoursMinutes, getTimeMinutes } from "../utils/time.helper";


export default function Home() 
{
    const [statistic, setStatistic] = useState<any>({})
    const [history, setHistory] = useState<any[]>([])


    const chartOptions = {
        chart: {
            height: 500,
            type: 'area'
        },
        title: {
            text: 'Pool Hashrate'
        },
        xAxis: {
            categories: history.map((i) => getTimeMinutes(i.time)),
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                formatter: function ()
                {
                    return this.value  + 'GH/s';
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
                name: 'Shared',
                data: history.map((i) => i.hashrate.shared / 1000000000),
                color: '#4eb000',
            },
            {
                name: 'Solo',
                data: history.map((i) => i.hashrate.solo / 1000000000),
                color: '#6e0404',
            }
        ]

    }

    const chartOptions2 = {
        chart: {
            height: 215,
        },
        title: {
            text: 'Network Difficulty'
        },

        xAxis: {
            categories: history.map((i) => getTimeMinutes(i.time)),
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                formatter: function ()
                {
                    return this.value / 1000  + 'k';
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
            height: 215,
        },
        title: {
            text: 'Pool Miners'
        },
        yAxis: {
            title: {
                text: ''
            },
        },
        xAxis: {
            categories: history.map((i) => getTimeMinutes(i.time)),
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
            height: 215,
        },
        title: {
            text: 'Pool Workers'
        },
        yAxis: {
            title: {
                text: ''
            },
        },
        xAxis: {
            categories: history.map((i) => getTimeMinutes(i.time)),
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
            height: 215
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },

        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    connectorColor: 'silver'
                }
            }
        },
        series: [
            {
                name: 'Share',
                type: 'pie',
                data: [
                    { name: 'Network', y: statistic?.network?.hashrate, color: '#130685' },
                    { name: 'Pool Hashrate', y: statistic?.hashrate?.shared, color: '#cc03b1' },
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
            .catch(e=>console.log(e))
        historicalApi()
            .then(({ data }) =>
            {
                setHistory(data?.body?.primary)
            })
            .catch(e=>console.log(e))
    }, [])

    console.log(statistic)

    return (
        <MainLayout>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container>
                <Row
                    gutter={[24, 24]}
                >
                    <Col
                        span={12}
                    >
                        <Card>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={chartOptions}
                            />
                        </Card>
                    </Col>
                    <Col
                        span={6}
                    >
                        <Space
                            direction="vertical"
                            size={24}
                            style={{ width: "100%" }}
                        >
                            <Card>
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={chartOptions2}
                                />
                            </Card>
                            <Card>
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={chartOptions3}
                                />
                            </Card>
                        </Space>
                    </Col>
                    <Col
                        span={6}
                    >
                        <Space
                            direction="vertical"
                            size={24}
                            style={{ width: "100%" }}
                        >
                            <Card>
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={chartOption4}
                                />
                            </Card>
                            <Card>
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={chartOptions5}
                                />
                            </Card>
                        </Space>
                    </Col>

                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Pool Shared hashrate"
                                value={
                                    hashRateFormat(statistic?.hashrate?.shared || 0, 3, 'H/s')
                                }
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Card>
                    </Col>

                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Pool TTF"
                                value={
                                    getHoursMinutes((statistic?.network?.hashrate / statistic?.hashrate?.shared) * 60)
                                }
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Card>
                    </Col>

                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Pool Round Shares"
                                value={
                                    statistic?.shares?.valid
                                }
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Card>
                    </Col>

                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Pool Round Effort"
                                precision={2}
                                value={
                                    statistic?.status?.effort
                                }
                                valueStyle={{ color: '#3f8600' }}
                                suffix="%"
                            />
                        </Card>
                    </Col>

                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Pool Solo hashrate"
                                value={
                                    hashRateFormat(statistic?.hashrate?.solo || 0, 3, 'H/s')
                                }
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Card>
                    </Col>

                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Pool Fee"
                                precision={2}
                                value={
                                    (statistic?.config?.recipientFee || 0) * 100
                                }
                                valueStyle={{ color: '#3f8600' }}
                                suffix="%"
                            />
                        </Card>
                    </Col>

                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Pool Payout Threshold"
                                precision={0}
                                value={
                                    (statistic?.config?.minPayment || 0)
                                }
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Card>
                    </Col>

                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Pool Payment Interval"
                                precision={0}
                                value={
                                    (statistic?.config?.paymentInterval || 0) / 60
                                }
                                valueStyle={{ color: '#3f8600' }}
                                suffix="minutes"
                            />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    )
}
