import { Table, Tag } from "antd";
import Container from "components/container";
import MainLayout from "layouts";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { activeMinersApi, allMinersApi, paymentsApi } from "../api";
import { hashRateFormat } from "../utils/unit.helper";
import { getTimeFormat, getTimeMinutes } from "../utils/time.helper";

const PaymentPage: NextPage = () =>
{
    const [payments, setPayments] = useState<any[]>([])
    const [solos, setSolos] = useState<any[]>([])

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
                    <span>
                        {i.transaction} {i.miners === 1 && <Tag>Solo</Tag>}
                    </span>
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
            <Container>
                <Table
                    columns={columns}
                    dataSource={payments}
                    pagination={false}
                />
            </Container>
        </MainLayout>
    )
}


export default PaymentPage