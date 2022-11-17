import { Card, Col, Collapse, Row } from "antd";
import Container from "components/container";
import MainLayout from "layouts";
import { NextPage } from "next";

const { Panel } = Collapse;

const data = [
    {
        title: "This is panel header 1",
        content: "A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world."
    },
    {
        title: "This is panel header 2",
        content: " it can be found as a welcome guest in many households across the world."
    },
    {
        title: "This is panel header 3",
        content: "A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be "
    }
]

const FaqPage: NextPage = () => 
{
    const onChange = (key: string | string[]) => 
    {
        console.log(key);
    };

    return (
        <MainLayout>
            <Container>
                <Row
                    gutter={[24, 32]}
                >
                    <Col span={24}>
                        <Card>
                            <Collapse defaultActiveKey={[0]} onChange={onChange}>
                                {
                                    data.map((i, index) => (
                                        <Panel header={i.title} key={index}>
                                            <p>{i.content}</p>
                                        </Panel>
                                    ))
                                }
                            </Collapse>
                        </Card>
                    </Col>

                </Row>
            </Container>
        </MainLayout>
    )
}


export default FaqPage