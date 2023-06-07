import React from 'react';
import { useState, useRef, useEffect } from 'react';
import Modal from '@/components/Popup';
import { input } from '@/components/Input';
import { label } from '@/components/Label';
import { Col, Row, Button } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import './Currency.less';
import { useIntl, useModel } from 'umi';

import search from './asset/search.svg';
import check from './asset/check.svg';

import dola from '@/components/Currency/asset/USD.svg';
import thaiBaht from '@/components/Currency/asset/THB.svg';
import cambodia from '@/components/Currency/asset/cambodia.svg';
import vnd from '@/components/Currency/asset/VND.svg';
import cny from '@/components/Currency/asset/CNY.svg';
import rub from '@/components/Currency/asset/RUB.svg';

function Currency({ onChange, readOnly, value }) {
  const { hotelData } = useModel('hoteldata');
  const listCurr = [
    {
      id: 'vn-flag',
      flag: vnd,
      name: 'Vietnamese Dong',
      label: '₫',
      value: 'VND',
    },
    {
      id: 'cny-flag',
      flag: cny,
      name: 'Chinese Yuan',
      label: '¥',
      value: 'CNY',
    },
    {
      id: 'rub-flag',
      flag: rub,
      name: 'Russian Ruble',
      label: '₽',
      value: 'RUB',
    },
    {
      id: 'dola-flag',
      flag: dola,
      name: 'United States Dollar',
      label: '$',
      value: 'USD',
    },
    {
      id: 'thaiBaht-flag',
      flag: thaiBaht,
      name: 'Thai Baht',
      label: '฿',
      value: 'THB',
    },
    {
      id: 'cambodia-flag',
      flag: cambodia,
      name: 'Cambodian Riel',
      label: '៛',
      value: 'KHR',
    },
  ];

  const inputRef = useRef();
  const intl = useIntl();

  const [searchTerm, setsearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, [isModalVisible]);

  const [currentItem, setCurrentItem] = useState();
  useEffect(() => {
    if (value) {
      setCurrentItem(listCurr.find((x) => x.value === value));
    } else {
      setCurrentItem(listCurr.find((x) => x.value === hotelData.currency));
    }
  }, [value]);

  return (
    <>
      {}
      <Button
        type="dashed"
        onClick={() => {
          setIsModalVisible(!isModalVisible);
        }}
        className="border-0 currency-button p-0 d-flex align-items-center"
      >
        <Row gutter={4}>
          <Col>
            <img className="flag" src={currentItem?.flag}></img>
          </Col>
          <Col className=" d-flex align-items-start"> {currentItem?.value}</Col>
          <Col className="d-flex align-items-center">
            <CaretDownOutlined />
          </Col>
        </Row>
      </Button>
      <Modal
        visible={!readOnly && isModalVisible}
        onClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
        size={'sm'}
        groupButton=" "
        title={intl.formatMessage({
          id: 'component.currency.title',
        })}
      >
        {/* display search */}
        <div className="currency-container">
          <div className="mt-4 mb-4">
            <input.medium
              prefix={<img className="search" src={search}></img>}
              placeholder="Search"
              ref={inputRef}
              onChange={(event) => {
                setsearchTerm(event.target.value);
              }}
            ></input.medium>
          </div>

          <div className="container">
            <Col span={24} className="d-flex justify-content-start">
              <p className="m-0 title-label">
                {intl.formatMessage({
                  id: 'component.currency.populartitle',
                })}
              </p>
            </Col>
            <Row gutter={[2, 2]}>
              {listCurr
                .filter(
                  (item) =>
                    item.value.includes(searchTerm.toUpperCase()) ||
                    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
                )
                .map((item, index) => {
                  return (
                    <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24} key={item.id}>
                      <div
                        className={
                          item.value == value
                            ? 'content p-2  w-100  selected m-0'
                            : 'content p-2  w-100 m-0'
                        }
                        onClick={() => {
                          onChange ? onChange(item.value) : hotelData.currency;
                          setIsModalVisible(!isModalVisible);
                        }}
                      >
                        <Row gutter={10} style={{ minWidth: '209px' }}>
                          <Col className="d-flex align-items-center" span={4}>
                            <img id={item.id} src={item.flag} alt=""></img>
                          </Col>
                          <Col className="d-flex flex-column align-items-start" span={16}>
                            <label.titlelg>
                              <span>{item.name}</span>
                            </label.titlelg>
                            {
                              <label.titlemd>
                                <span className="currency-label">
                                  {item.value + ' - ' + item.label}
                                </span>
                              </label.titlemd>
                            }
                          </Col>
                          <Col span={4}>
                            {item.value == value && (
                              <div className="currency-check h-100 d-flex align-items-center">
                                <img src={check}></img>
                              </div>
                            )}
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  );
                })}
            </Row>
          </div>
        </div>
      </Modal>
    </>
  );
}

export { Currency };
