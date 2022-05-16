import react from "react";

import React, { useState } from "react";
import { Modal, Button, Row, Col, Input, Select } from "antd";
import { Typography } from "antd";
import { Divider } from "antd";

import { Switch } from "antd";

import prefix from "../../images/prefix.svg";
import address from "../../images/address.svg";
import phone1 from "../../images/phone1.svg";
import email from "../../images/email.svg";
import up from "../../images/up.svg";
import CloseIcon from "../../images/close.js";

const { Text } = Typography;

function AddCompany() {
  const key = "Unstopable";
  const [popupVisible, setpopupVisible] = useState(false);

  const showModal = () => {
    setpopupVisible(true);
  };

  const handleOk = () => {
    setpopupVisible(false);
  };

  const handleCancel = () => {
    setpopupVisible(false);
  };

  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal

        title="Add Company"
        visible={popupVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{ paddingTop: "0px" }}
        closable={true}
        closeIcon={
           
                <image src={email} alt="" />
              
            }
        width={648}
        footer={[
          <Col className="container" key={key}>
            <Row gutter={10}>
              <Col offset={12} span={6}>
                <Button
                  key="Cancel"
                  block={true}
                  type="ghost"
                  size="large"
                  shape="round"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Col>
              <Col span={6}>
                <Button
                  key="Add"
                  block={true}
                  type="primary"
                  shape="round"
                  size="large"
                  onClick={handleOk}
                >
                  Add
                </Button>
              </Col>
            </Row>
          </Col>,
        ]}
      >
        {/* full width srcreen */}
        <Divider
          orientation="left"
          orientationMargin="0"
          dashed={true}
          plain
          style={{ borderTopColor: "white" }}
        >
          Info <Text type="warning">*</Text>
        </Divider>
        <Col className="container">
          <Col span={24}>
            {/* <Row span={24}> Info <Text type="warning">*</Text></Row> */}

            <Row gutter={[38, 16]} justify="space-between">
              <Col xl={12} xxl={12} lg={12} md={12} sm={24} xs={24}>
                <label htmlFor="examplehtmlFormControlInput1">ID</label>
                <Input
                  suffix={<img src={prefix} alt=""></img>}
                  type="email"
                  className="htmlForm-control"
                  id="examplehtmlFormControlInput1"
                  placeholder="Code"
                />
              </Col>
              <Col xl={12} xxl={12} lg={12} md={12} sm={24} xs={24}>
                <label htmlFor="examplehtmlFormControlInput1">Address</label>
                <Input
                  suffix={<img src={address} alt=""></img>}
                  type="text"
                  className="htmlForm-control"
                  id="examplehtmlFormControlInput1"
                  placeholder="Code"
                />
              </Col>
              {/* name */}
              <Col xl={12} xxl={12} lg={12} md={12} sm={24} xs={24}>
                <label htmlFor="examplehtmlFormControlInput1">Name</label>
                <Input
                  suffix={<img src={prefix}></img>}
                  type="email"
                  className="htmlForm-control"
                  id="examplehtmlFormControlInput1"
                  placeholder="Code"
                />
              </Col>
              {/* Tax */}

              <Col xl={12} xxl={12} lg={12} md={12} sm={24} xs={24}>
                <Row gutter={11}>
                  <Col xl={12} xxl={12} lg={12} md={12} sm={24} xs={24}>
                    <label htmlFor="examplehtmlFormControlInput1">Tax</label>
                    <Input
                      suffix={<img src={prefix}></img>}
                      type="email"
                      className="htmlForm-control"
                      id="examplehtmlFormControlInput1"
                      placeholder="Code"
                    />
                  </Col>
                  <Col xl={12} xxl={12} lg={12} md={12} sm={24} xs={24}>
                    <label htmlFor="examplehtmlFormControlInput1">Phone</label>
                    <Input
                      suffix={<img src={phone1}></img>}
                      type="email"
                      className="htmlForm-control"
                      id="examplehtmlFormControlInput1"
                      placeholder="Code"
                    />
                  </Col>
                </Row>
              </Col>

              {/* legal name */}
              <Col xl={12} xxl={12} lg={12} md={12} sm={24} xs={24}>
                <label htmlFor="examplehtmlFormControlInput1">Legal Name</label>
                <Input
                  suffix={<img src={prefix}></img>}
                  type="email"
                  className="htmlForm-control"
                  id="examplehtmlFormControlInput1"
                  placeholder="Legal Name"
                />
              </Col>
              {/* email + bank account */}
              <Col xl={12} xxl={12} lg={12} md={12} sm={24} xs={24}>
                <Row gutter={11}>
                  <Col xl={12} xxl={12} lg={12} md={12} sm={24} xs={24}>
                    <label htmlFor="examplehtmlFormControlInput1">Email</label>
                    <Input
                      suffix={<img src={email}></img>}
                      type="email"
                      className="htmlForm-control"
                      id="examplehtmlFormControlInput1"
                    />
                  </Col>
                  <Col xl={12} xxl={12} lg={12} md={12} sm={24} xs={24}>
                    <label htmlFor="examplehtmlFormControlInput1">
                      Bank account
                    </label>
                    <Input
                      type="email"
                      className="htmlForm-control"
                      id="examplehtmlFormControlInput1"
                    />
                  </Col>
                </Row>
              </Col>
              <Col xl={12} xxl={12} lg={12} md={12} sm={24} xs={24}>
                <label htmlFor="examplehtmlFormControlInput1">
                  Credit limit
                </label>
                <Input
                  suffix={<img src={prefix}></img>}
                  type="email"
                  className="htmlForm-control"
                  id="examplehtmlFormControlInput1"
                  placeholder="Number"
                />
              </Col>
              <Col xl={12} xxl={12} lg={12} md={12} sm={24} xs={24}>
                <label htmlFor="examplehtmlFormControlInput1">Booker</label>
                <Select
                  style={{ width: "100%" }}
                  size="default"
                  suffixIcon={<img src={up}></img>}
                />
              </Col>

              <Col span={24}>
                <span>Account receivable (AR)</span>
                <Switch defaultChecked onChange={onChange} />
              </Col>
            </Row>
          </Col>

          <hr></hr>
        </Col>
        <Divider
          orientation="left"
          orientationMargin="0"
          dashed={true}
          plain
          style={{ borderTopColor: "white" }}
        >
          Statistics <Text type="warning">*</Text>
        </Divider>
        <Col className="container">
          <Col span={24}>
            <Row gutter={[38, 16]} justify="space-between">
              <Col xl={12} xxl={12} lg={12} md={12} sm={24} xs={24}>
                <label htmlFor="examplehtmlFormControlInput1">
                  Source code
                </label>
                <Select
                  style={{ width: "100%" }}
                  size="default"
                  placeholder="Source code"
                  suffixIcon={<img src={up}></img>}
                />
              </Col>
              <Col xl={12} xxl={12} lg={12} md={12} sm={24} xs={24}>
                <label htmlFor="examplehtmlFormControlInput1">Type</label>
                <Select
                  style={{ width: "100%" }}
                  size="default"
                  placeholder="Source code"
                  suffixIcon={<img src={up}></img>}
                />
              </Col>
              <Col xl={12} xxl={12} lg={12} md={12} sm={24} xs={24}>
                <label htmlFor="examplehtmlFormControlInput1">
                  Market segment
                </label>
                <Select
                  style={{ width: "100%" }}
                  size="default"
                  placeholder="Market segment"
                  suffixIcon={<img src={up}></img>}
                />
              </Col>
              <Col xl={12} xxl={12} lg={12} md={12} sm={24} xs={24}>
                <label htmlFor="examplehtmlFormControlInput1">Branch</label>
                <Select
                  style={{ width: "100%" }}
                  size="default"
                  placeholder="Market segment"
                  suffixIcon={<img src={up}></img>}
                />
              </Col>
              <Col xl={12} xxl={12} lg={12} md={12} sm={24} xs={24}>
                <label htmlFor="examplehtmlFormControlInput1">Industry</label>
                <Select
                  placeholder="Industry"
                  style={{ width: "100%" }}
                  size="default"
                  suffixIcon={<img src={up}></img>}
                />
              </Col>
            </Row>
          </Col>
        </Col>
      </Modal>
    </>
  );
}

export default AddCompany;
