import {
  Col,
  Row,
} from "@/lib/AntRegistry";
import React, { ReactElement, useState } from "react";

import { useRouter } from "next/router";
import { Form, Select } from "antd";
const Home = () => {
  const router = useRouter();
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    total_count: 0,
    data: []
  })
  const initData = async () => {
    setLoading(true)
    try {
      let apiRes:any = "apicall"
      setData(apiRes.data)
    } catch (error) {

    }
    finally{
      setLoading(false)
    }
  }
 
  const initProcessSchdule = async () => {
    try {
      let urlSearchParam = new URLSearchParams();
      urlSearchParam.set("date", String(router.query.date));
      urlSearchParam.set("pagination", String(0))
      urlSearchParam.set("limit", String(5));
      let apiRes = "apiurl"
    } catch (error) {
      
    }
  }
  React.useEffect(() => {
    initData()
    initProcessSchdule()
  }, [])
  return (
    <>
      <section className="dashboard_section">
        <div className="container-fluid">
          <Row gutter={[24, 24]}>
            <Col span={24} lg={12} xl={12} xxl={12}>
            </Col>
            </Row>
        </div>
      </section>
    </>
  );
};

export default Home;
