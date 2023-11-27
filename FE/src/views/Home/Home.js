import React, { useState, useContext, useEffect } from 'react';
import { Avatar, List, Button, Modal, Form, Input, message, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Chart from '../../components/Chart/Chart';
import useDidMountEffect from '../../components/useDidMountEffect';
import { ThemeContext } from '../../contexts/ThemeContext';
import { AuthContext } from '../../contexts/AuthContext';
import { getList, createPoll, updatePoll } from '../../services/pollService';
import { LOCAL_STOGRATE_USER_INFOR } from '../../contants/index';
const { TextArea } = Input;

const Home = (props) => {
  const contextDataTheme = useContext(ThemeContext);
  const { changeTheme, theme } = contextDataTheme;
  const contextAuth = useContext(AuthContext);
  const { isAuthenticated } = contextAuth;

  const [listPoll, setListPoll] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [poll, setPoll] = useState({});
  const [isCreate, setIsCreate] = useState(true);
  const [idVoted, setIdVoted] = useState(null);

  useDidMountEffect(() => {
    onGetList();
  }, []);

  const onGetList = async () => {
    try {
      const res = await getList({});
      setListPoll(res.data);
    } catch (error) {}
  };

  const showModal = () => {
    if (!isAuthenticated) {
      message.error('You need login to make a poll!');
    } else {
      setPoll({});
      setIsCreate(true);
      setIsModalOpen(true);
    }
  };
  const onCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    const user = JSON.parse(localStorage.getItem(LOCAL_STOGRATE_USER_INFOR));
    try {
      const res = isCreate ? await createPoll({ ...values, author: user._id }) : await updatePoll({ ...poll, idVoted });
      message.success(res.message);
      setIsModalOpen(false);
      onGetList();
      setPoll(res.data);
    } catch (error) {
      console.log('error', error);
      message.error(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const openVote = (item) => {
    setPoll(item);
    setIsModalOpen(true);
    setIsCreate(false);
  };

  const onVoteSelect = (val) => {
    setIdVoted(val.target.value);
  };

  return (
    <div className="p-5">
      <div className="flex justify-end">
        <Button type="primary" onClick={showModal} data-testid="create-poll-btn">
          Create a poll
        </Button>
        <Modal title="Add a poll" open={isModalOpen} footer={null} onCancel={onCancel}>
          <Form
            key={poll._id}
            name="pollForm"
            labelCol={{ span: 8 }}
            layout="vertical"
            initialValues={poll}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input your poll title!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description" rules={[{ required: false, message: 'optional' }]}>
              <TextArea rows={4} />
            </Form.Item>

            {isCreate ? (
              <Form.List
                name="votes"
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!names || names.length < 2) {
                        return Promise.reject(new Error('At least 2 options'));
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item label={index === 0 ? 'options' : ''} required={false} key={field.key}>
                        {console.log('field', field)}
                        <Form.Item
                          {...field}
                          name={[field.name, 'option']}
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "Please input option's value or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input style={{ width: '94%', marginRight: '10px' }} placeholder="option value" />
                        </Form.Item>
                        {fields.length > 1 ? <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} /> : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                        Add option
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
            ) : (
              <Radio.Group className="w-full">
                {poll.votes.map((item, index) => {
                  return (
                    <Radio.Button className="!block w-[50%] !m-auto !mb-5" value={item._id} onClick={(val) => onVoteSelect(val)}>
                      {item.option}
                    </Radio.Button>
                  );
                })}
              </Radio.Group>
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div className="flex gap-10">
        <div className="w-2/5">
          <List
            itemLayout="horizontal"
            dataSource={listPoll}
            renderItem={(item, index) => (
              <List.Item onClick={() => setPoll(item)} className="cursor-pointer">
                <List.Item.Meta
                  avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                  title={
                    <div className="flex justify-between">
                      <div>{item.title}</div>
                      <div className="cursor-pointer text-blue-600 ml-5" onClick={() => openVote(item)}>
                        vote
                      </div>
                    </div>
                  }
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </div>
        <div className="w-3/5">
          <Chart poll={poll} />
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {};

export default Home;
