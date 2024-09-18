import { GlobalContext } from "@/context/Provider";
import {
  AntForm,
  Col,
  Flex,
  FormItem,
  Input,
  Row,
  TypographyText,
} from "@/lib/AntRegistry";
import { useRouter } from "next/router";
import React, { ReactElement, useContext, useState } from "react";
import banner from "@/assets/images/Artboard.png";
import { Button, Form } from "antd";
import Link from "next/link";
import MainLayout from "@/components/common/MainLayout";

const Organisation = () => {
  const { setUserInfo, userInfo, Toast } =
    useContext(GlobalContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      let payload = {
        email: values?.email,
        password: values?.password,
        device_type: "ANDROID",
        fcm_token: "string",
      };
      const apiRes = "apiUrl";
    } catch (error: any) {
      Toast.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <AntForm
            onFinish={handleSubmit}
            form={form}
            requiredMark={false}
            layout="vertical"
            autoComplete="off"
          >
            {/* Username  */}
            <FormItem
              name="organistaion_name"
              label="Organisation name"
              className="mb-3"
              rules={[
                {
                  required: true,
                  message: "Please enter your organisation name",
                },
              ]}
            >
              <Input
                inputMode="text"
                size="large"
                type="text"
                autoComplete="off"
                placeholder="Enter your organisation name"
              />
            </FormItem>

            {/* Password  */}
            <FormItem
              name="no_of_employees"
              label="Number of the employees"
              className="mb-3 fw-normal"
              rules={[
                {
                  required: true,
                  message: "Please enter the number of employees",
                },
              ]}
            >
              <Input
                inputMode="text"
                size="large"
                type="text"
                autoComplete="off"
                placeholder="Enter the number of employees"
              />
            </FormItem>
            <FormItem>
              <Button
                loading={loading}
                disabled={loading}
                htmlType="submit"
                size="large"
                block
                type="primary"
                className="btn-gradient"
              >
                Submit
              </Button>
            </FormItem>
            <div className="mb-3">
              <label className="">Add Department</label>
            </div>
          </AntForm>
        </Col>
        <Col span={24} className="text-center">
          <TypographyText className=" d-block">
            You can always change this later.
          </TypographyText>
          <Link href={"/"}>Skip</Link>
        </Col>
      </Row>
    </>
  );
};

export default Organisation;