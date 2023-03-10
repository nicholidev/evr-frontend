import { Grid, Table, Tag } from "antd";
import Container from "components/container";
import MainLayout from "layouts";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { activeMinersApi, allMinersApi, paymentsApi } from "../api";
import { hashRateFormat } from "../utils/unit.helper";
import { getTimeFormat, getTimeMinutes } from "../utils/time.helper";
import Head from "next/head";

const { useBreakpoint } = Grid;

const PaymentPage: NextPage = () =>
{
    const breakpoints = useBreakpoint();

    const [payments, setPayments] = useState<any[]>([])

    const columns: any[] = [
        {
            title: "Time",
            dataIndex: "time",
            render: (i: number) => getTimeFormat(i)
        },
        {
            title: "Confirmation",
            render: (i: any) =>
            {
                return (
                    <a
                        href={`https://evr.cryptoscope.io/tx/?txid=${i.transaction}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {i.transaction} {i.miners === 1 && <Tag color="blue">Solo</Tag>}
                    </a>
                )
            }
        },
        {
            title: "Miners Paid",
            dataIndex: "miners",
        },
        {
            title: "Total Paid",
            dataIndex: "paid",
            render: (i: number) => i.toFixed(2)
        },
    ]

    useEffect(() =>
    {
        paymentsApi()
            .then(({ data }) =>
            {
                console.log(data?.body?.primary)
                setPayments(data?.body?.primary?.map((i: any, index: number) => {i.index = index + 1; return i}))
            })
            .catch(e=>{console.log(e)})
    }, [])

    return (
        <MainLayout>
            <Head>
                <title>Payment</title>
                <meta name="description" content="EVRpool.ninja | Payments"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Container>
                <h1 className="page-title">Last {payments.length} Payments</h1>
                <Table
                    columns={columns}
                    dataSource={payments}
                    pagination={false}
                    size={
                        breakpoints.md ? "middle" : "small"
                    }
                    scroll={{ x: '1100px' }}
                />
            </Container>
        </MainLayout>
    )
}


export default PaymentPage