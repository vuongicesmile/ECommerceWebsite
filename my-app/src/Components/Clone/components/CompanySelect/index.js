import { useState, useRef, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import { label } from '../Label';
import { input } from '../Input';
import { useModel, useIntl } from 'umi';
import { Divider } from 'antd';
import arrowIcon from './asset/arrow.svg';
import addIcon from './asset/add.svg';
import closeIcon from './asset/close.svg';
import './companySelect.less';

const CompanySelect = ({
  imgadd,
  onChange,
  value,
  allowAdd,
  onAdd,
  onAddComplete,
  readOnly,
  required = false,
  maxHeight,
}) => {
  const intl = useIntl();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [valueShow, setValueShow] = useState(
    intl.formatMessage({
      id: 'component.companyselect.placeholder',
    }),
  );
  const [numberShow, setNumberShow] = useState(25);
  const [isClose, setIsClose] = useState(false);
  const { company, updateCompany } = useModel('companydata');
  const { receiveChangeCompany } = useModel('receivesocket');
  const searchCompanyRef = useRef();
  const firstUpdate = useRef(true);
  const inputRef = useRef();
  const containerInnerRef = useRef();
  const isAddRef = useRef(false);

  const onScroll = () => {
    if (containerInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerInnerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5 && company.length > numberShow) {
        setNumberShow(numberShow + 25);
      }
    }
  };

  useEffect(() => {
    const onClick = (e) => {
      if (!searchCompanyRef.current?.contains(e.target)) {
        containerInnerRef.current?.scrollTo(0, 0);
        setNumberShow(25);
        setSearchValue('');
        setShowSearch(false);
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    if (!value) {
      onChange ? onChange(null) : undefined;
      setValueShow(
        intl.formatMessage({
          id: 'component.companyselect.placeholder',
        }),
      );
      setSearchValue('');
    } else {
      const companyItem = company.find((item) => item.ma == value);
      // onChange(companyItem);
      if (companyItem) {
        setValueShow(companyItem.company);
        setSearchValue('');
      }
    }
  }, [value]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (onAddComplete && isAddRef.current) {
      onAddComplete(company[company.length - 1]);
      isAddRef.current = false;
    }
  }, [company.length]);

  useEffect(() => {
    if (receiveChangeCompany) updateCompany();
  }, [receiveChangeCompany]);

  return (
    <div
      className="position-relative search-company-container"
      style={{ width: '100%' }}
      ref={searchCompanyRef}
    >
      <div
        className={`d-flex align-items-center w-100 company-show ${
          readOnly ? 'read-only-company' : ''
        } ${required && !readOnly ? 'company-select-required' : ''}`}
        style={{ borderRadius: isDropdownOpen ? '5px 5px 0 0' : '5px' }}
        onMouseEnter={() => {
          if (
            valueShow !== intl.formatMessage({ id: 'component.companyselect.placeholder' }) &&
            !readOnly
          ) {
            setIsClose(true);
          }
        }}
        onMouseLeave={() => setIsClose(false)}
      >
        {showSearch ? (
          <input
            ref={inputRef}
            value={searchValue}
            onChange={(e) => {
              containerInnerRef.current?.scrollTo(0, 0);
              setSearchValue(e.target.value);
              setNumberShow(25);
            }}
            className={`search-company-input mx-2 ${required ? 'company-select-required' : ''}`}
            placeholder={valueShow}
          />
        ) : (
          <div
            onClick={() => {
              if (!readOnly) {
                setTimeout(() => {
                  inputRef.current?.focus();
                }, 200);
                setIsDropdownOpen(true);
                setShowSearch(true);
              }
            }}
            style={{
              cursor: readOnly ? 'not-allowed' : 'text',
              width: '93%',
              color:
                valueShow === intl.formatMessage({ id: 'component.companyselect.placeholder' })
                  ? '#8e8e8e'
                  : '#000',
            }}
            className={`mx-2 company-select-show`}
          >
            {valueShow}
          </div>
        )}
        {isClose ? (
          <div
            className={`img-container cursor-pointer ${allowAdd ? 'me-1' : 'me-2'}`}
            onClick={() => {
              setValueShow(intl.formatMessage({ id: 'component.companyselect.placeholder' }));
              if (onChange) {
                onChange(null);
              }
              setIsClose(false);
            }}
          >
            <img
              style={{
                width: '10px',
              }}
              src={closeIcon}
            ></img>
          </div>
        ) : (
          <img
            onClick={() => {
              if (!readOnly) {
                setIsDropdownOpen(true);
                setShowSearch(true);
              }
            }}
            className={`${allowAdd ? 'me-2' : 'me-3'} `}
            style={{ cursor: readOnly ? 'not-allowed' : 'pointer' }}
            src={arrowIcon}
          />
        )}
        {allowAdd && (
          <img
            className="me-2"
            style={{ cursor: readOnly ? 'not-allowed' : 'pointer' }}
            onClick={() => {
              if (onAdd && !readOnly) {
                onAdd();
                isAddRef.current = true;
              }
            }}
            src={imgadd ?? addIcon}
          />
        )}
      </div>
      <div
        onScroll={onScroll}
        ref={containerInnerRef}
        className={`dropdown-container position-absolute ${isDropdownOpen ? 'd-block' : 'd-none'}`}
        style={{ maxHeight: maxHeight ? maxHeight : '300px' }}
      >
        <div className="company-container">
          {!company.filter((item) => item.isUse == 0).length && (
            <div className="text-center p-3" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
              No Company
            </div>
          )}
          {company?.filter((item) => {
            return (
              (item.company.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
                item.businessName.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
                item.phone.toLowerCase().includes(searchValue.toLocaleLowerCase())) &&
              item.isUse == 0
            );
          }).length === 0 ? (
            <div className="text-center p-3" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
              No Company
            </div>
          ) : (
            company
              ?.filter((item) => {
                return (
                  (item.company.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
                    item.businessName.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
                    item.phone.toLowerCase().includes(searchValue.toLocaleLowerCase())) &&
                  item.isUse == 0
                );
              })
              .slice(0, numberShow)
              .map((item) => {
                return (
                  <div key={item.ma}>
                    <div
                      className="p-2 cursor-pointer my-1 search-company-item"
                      onClick={() => {
                        containerInnerRef.current?.scrollTo(0, 0);
                        setNumberShow(25);
                        setValueShow(item.company);
                        setSearchValue('');
                        setShowSearch(false);
                        setIsDropdownOpen(false);
                        if (onChange) {
                          onChange(item);
                        }
                      }}
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <label.titlelg>{item.ma}</label.titlelg>
                        </div>
                        <Divider type="vertical" />
                        <div style={{ width: '70%' }}>
                          <label.titlelg>
                            <Highlighter
                              highlightClassName="highlight-class"
                              searchWords={[searchValue]}
                              autoEscape={true}
                              textToHighlight={`${item.company}`}
                            />
                          </label.titlelg>
                        </div>
                        <Divider type="vertical" />
                        <div style={{ width: '30%' }}>
                          <label.titlemd>
                            <Highlighter
                              highlightClassName="highlight-class"
                              searchWords={[searchValue]}
                              autoEscape={true}
                              textToHighlight={item.phone}
                            />
                          </label.titlemd>
                        </div>
                      </div>
                      <div>
                        <label.titlemd>
                          <Highlighter
                            highlightClassName="highlight-class"
                            searchWords={[searchValue]}
                            autoEscape={true}
                            textToHighlight={item.businessName}
                          />
                        </label.titlemd>
                      </div>
                    </div>
                    <hr className="m-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />
                  </div>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
};

export { CompanySelect };
