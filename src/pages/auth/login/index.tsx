import { GlobalContext } from "@/context/Provider";
import { Col, Row } from "@/lib/AntRegistry";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { destroyCookie, setCookie } from "nookies";

const Login = () => {
  const {
    setUserInfo,
    Toast,
  } = useContext(GlobalContext);
  const router = useRouter();
  const { user_type } = router.query;
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      let apiRes = "apiurl";
    } catch (error: any) {
      Toast.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <section className="auth_section">
        <div className="container">
          <Row justify={"end"}>
            <Col span={24} md={12} lg={12} xl={10} xxl={8}>
            {/* Login page design here */}
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};
export default Login;
