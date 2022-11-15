import { Table, Tag } from "antd";
import Container from "components/container";
import MainLayout from "layouts";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { activeMinersApi, allMinersApi } from "../api";
import { hashRateFormat } from "../utils/unit.helper";

const MinersPage: NextPage = () => 
{
    const [shares, setShares] = useState<any[]>([])
    const [solos, setSolos] = useState<any[]>([])

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
                    <>
                        {i.miner} {i.effort && <Tag color="green">Solo</Tag>}
                    </>                    
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
            <Container>
                <Table
                    columns={columns}
                    dataSource={shares}
                    pagination={false}
                />
            </Container>
        </MainLayout>
    )
}


export default MinersPage