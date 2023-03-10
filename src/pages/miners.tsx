import { Col, Grid, Table, Tag } from "antd";
import Container from "components/container";
import MainLayout from "layouts";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { activeMinersApi, allMinersApi } from "../api";
import { hashRateFormat } from "../utils/unit.helper";
import Head from "next/head";
import Link from "next/link";
const { useBreakpoint } = Grid;


const MinersPage: NextPage = () => 
{
    const breakpoints = useBreakpoint();

    const [shares, setShares] = useState<any[]>([])

    const columns: any[] = [
        {
            title: "#",
            width: "50",
            dataIndex: "index",
            align: "center"
        },
        {
            title: "Miner Address",
            align: "left",
            render: (i: any) =>
            {
                return (
                    <Link
                        href={`/dashboard/?miner=${i.miner}`}
                    >
                        {i.miner} {i.effort && <Tag color="blue">Solo</Tag>}
                    </Link>
                )
            }
        },
        {
            title: "Miners Hashrate",
            dataIndex: "hashrate",
            align: "left",
            render: (i: number) => hashRateFormat(i, 3, 'H/s')
        }
    ]

    useEffect(() =>
    {
        activeMinersApi()
            .then(({ data }) =>
            {
                let d: any[] = [...data?.body?.primary?.shared, ...data?.body?.primary?.solo]
                d = d.sort((a, b) =>b.hashrate - a.hashrate);
                setShares(d.map((i, index) => {i.index = index + 1; return i}))
            })
            .catch(e=>{console.log(e)})
    }, [])

    return (
        <MainLayout>
            <Head>
                <title>Miners</title>
                <meta name="description" content="EVRpool.ninja | Miners"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Container>
                <h1 className="page-title">Top (active) Miners</h1>
                <Table
                    columns={columns}
                    dataSource={shares}
                    pagination={false}
                    size={
                        breakpoints.md ? "middle" : "small"
                    }
                    scroll={{ x: '600px' }}
                />
            </Container>
        </MainLayout>
    )
}


export default MinersPage