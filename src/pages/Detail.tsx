import { Row, Col, Pagination, Divider, Button, message } from 'antd';
import Breadcrumb from '@/pages/components/Breadcrumb';
import styles from './detail.less';
import { ClockCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { connect, Link } from 'umi';
import {
  LikeOutlined,
  LikeFilled,
  MessageFilled,
  StarOutlined,
  StarFilled,
  MessageOutlined,
} from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { Form, Input, Comment, List, Tooltip } from 'antd';
import MyAvatar from './components/Avatar';
import { useImmer } from 'use-immer';
import React from 'react';
import { history } from 'umi';
const { TextArea } = Input;

const DetailContext = React.createContext({});

const style = { background: '#fff', padding: '32px' };

const BOTTOM = 40;

const LikeIcon: any = (props: any) => {
  const {
    filledStyle = {},
    outlinedStyle = {},
    style = {},
    isLike = false,
  } = props;
  return isLike ? (
    <LikeFilled style={{ ...style, ...filledStyle }} />
  ) : (
    <LikeOutlined style={{ ...style, ...outlinedStyle }} />
  );
};

const FavoriteIcon: any = (props: any) => {
  const { style = {}, isFavorite = false } = props;
  return isFavorite ? (
    <StarFilled style={style} />
  ) : (
    <StarOutlined style={style} />
  );
};

const MyComment = connect(({ user }: any) => ({ user: user.data }))(
  (props: any) => {
    const {
      user = {},
      index,
      onReplyClick,
      replyIndex,
      isReply,
      dispatch,
      id,
      children,
      content = '',
      post_like = 0,
      from_user_avatar,
      from_user_nickname = '',
      is_like,
      active = false,
    } = props;
    const commentLike = () => {
      if (!user?.id) {
        dispatch({
          type: 'global/toggleLogin',
        });
        return;
      }

      if (isReply) {
        dispatch({
          type: 'comment/toggleReplyLike',
          payload: {
            id,
            index,
            replyIndex,
          },
        });
      } else {
        dispatch({
          type: 'comment/toggleLike',
          payload: {
            id,
            index,
          },
        });
      }
    };

    const actions = [
      <Tooltip key="comment-basic-like" title="点赞">
        <span
          onClick={() => {
            commentLike();
          }}
          className={styles.icon}
        >
          <LikeIcon isLike={is_like} filledStyle={{ color: '#1890ff' }} />
          <span className={styles.commentAction}>{post_like}</span>
        </span>
      </Tooltip>,

      <span
        onClick={() => {
          if (onReplyClick) {
            onReplyClick(active);
          }
        }}
        className={classNames(styles.icon, {
          [styles.active]: active,
        })}
        key="comment-basic-reply-to"
      >
        <MessageFilled />
        <span className={styles.commentAction}>
          {active ? '取消回复' : '回复'}
        </span>
      </span>,
    ];

    return (
      <>
        <Comment
          actions={actions}
          author={
            <div className={styles.author}>
              <a className={styles.nickname}>
                {from_user_nickname || '未设置昵称'}
              </a>
              {isReply && (
                <>
                  <span style={{ padding: '0 5px' }}>回复</span>
                  <a className={styles.nickname}>好家伙</a>
                </>
              )}
            </div>
          }
          avatar={
            <MyAvatar avatar={from_user_avatar} nickname={from_user_nickname} />
          }
          content={
            <div
              className={styles.richContent}
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          }
        >
          {children}
        </Comment>
      </>
    );
  },
);

const CommentList = connect(({ comment }: any) => ({
  replyActive: comment.replyActive,
  replyContent: comment.replyContent,
}))((listProps: any) => {
  const {
    comment = [],
    isReply = false,
    replyActive,
    replyContent,
    parent = '',
    dispatch,
  } = listProps;

  const onReplyClick = (current: any) => {
    dispatch({
      type: 'comment/saveState',
      payload: {
        replyActive: current,
      },
    });
  };

  return (
    <List
      dataSource={comment}
      header={false}
      itemLayout="horizontal"
      renderItem={(props: any, index: number) => {
        const { comment_reply = [], reply_others_count = 0 } = props;

        const current = isReply ? parent + '-' + index : index;

        return (
          <MyComment
            active={replyActive === current}
            onReplyClick={(active: boolean) => {
              let replyIndex = current;
              if (active) {
                replyIndex = '';
              }
              onReplyClick(replyIndex);
            }}
            isReply={isReply}
            index={isReply ? parent : index}
            replyIndex={index}
            {...props}
          >
            {replyActive === current && (
              <div data-current={current} className={styles.replyEditor}>
                <TextArea
                  value={replyContent}
                  onChange={(e) => {
                    const value = e.target.value;
                    dispatch({
                      type: 'comment/saveState',
                      payload: {
                        replyContent: value,
                      },
                    });
                  }}
                  rows={2}
                ></TextArea>
                <div className={styles.footer}>
                  <div className={styles.left}></div>
                  <Button
                    onClick={(e) => {
                      let { id, from_user_id: to_user_id } = props;

                      dispatch({
                        type: 'comment/addReply',
                        payload: {
                          id,
                          current,
                          content: replyContent,
                          reply_type: isReply ? 1 : 0,
                          to_user_id,
                        },
                      });
                    }}
                    type="primary"
                  >
                    发布
                  </Button>
                </div>
              </div>
            )}
            {comment_reply.length > 0 && (
              <>
                <CommentList
                  {...listProps}
                  isReply={true}
                  parent={index}
                  comment={comment_reply}
                />
                <Divider style={{ margin: '10px 0' }} />
                {reply_others_count > 0 && (
                  <div className={styles.viewMore}>
                    展开其他{reply_others_count}条回复
                  </div>
                )}
              </>
            )}
          </MyComment>
        );
      }}
    />
  );
});

const Editor = ({ onChange, onSubmit, submitting, value }: any) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item noStyle>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        添加评论
      </Button>
    </Form.Item>
  </>
);

const Detail = (props: any) => {
  const {
    post,
    comment = [],
    commentAllCount = 0,
    postCategory,
    user,
    dispatch,
    loading,
  } = props;

  const [state, setState] = useImmer({
    comment: '', // 评论的文章内容
    replyData: {
      content: '',
    },
  });

  const {
    breadcrumbs = [],
    category = {},
    categoryTrees = {},
    hots = [],
    lists = {},
  } = postCategory;

  const [fixedBottom, setFixedBottom] = useState(BOTTOM);

  useEffect((): any => {
    const init = () => {
      window.onscroll = () => {
        const clientHeight = document.documentElement.clientHeight;
        const scrollTop = document.documentElement?.scrollTop;

        const root = document.getElementById(styles.root);
        const rootHeight = root?.clientHeight || 0;

        const header = document.getElementById('header');
        const headerHeight = header?.clientHeight || 0;

        const bottom = headerHeight + rootHeight - clientHeight;

        if (bottom < scrollTop) {
          setFixedBottom(BOTTOM + scrollTop - bottom);
        }
      };
    };

    init();

    return () => {
      window.onscroll = null;
    };
  }, []);

  const getPaginate = (post: any = {}) => {
    if (post?.id > 0) {
      return (
        <Link
          key={post.id}
          className={styles.listItem}
          to={`${category.alias}/post/${post.id}?cid=${category.id}`}
        >
          {post.post_title}
        </Link>
      );
    }

    return <p>没有了</p>;
  };

  /*
   *@Author: frank
   *@Date: 2022-02-23 13:07:47
   *@Description: 收藏
   */
  const favorite = () => {
    if (!user?.id) {
      dispatch({
        type: 'global/toggleLogin',
      });
      return;
    }

    dispatch({
      type: 'post/toggleFavorite',
      payload: {
        id: post.id,
      },
    });
  };

  /*
   *@Author: frank
   *@Date: 2022-02-22 18:51:25
   *@Description: 点赞
   */
  const like = () => {
    if (!user?.id) {
      dispatch({
        type: 'global/toggleLogin',
      });
      return;
    }

    dispatch({
      type: 'post/toggleLike',
      payload: {
        id: post.id,
      },
    });
  };

  return (
    <div id={styles.root} className={classNames(styles.root, 'bg')}>
      <div className="header-top"></div>
      <div className="main">
        <Breadcrumb style={{ marginBottom: '16px' }} data={breadcrumbs} />
        <Row gutter={16}>
          <Col className="gutter-row" span={16}>
            <div style={style} className={styles.wrap}>
              <h1 className={styles.title}>{post.post_title}</h1>
              <div className={styles.info}>
                <span className={classNames(styles.date, 'mr-1')}>
                  <ClockCircleOutlined /> {post.update_time}
                </span>
                <span className={classNames(styles.author, 'mr-1')}>
                  作者：{post.user_login}
                </span>
                <span className={styles.hits}>阅读：{post.post_hits}</span>
              </div>
              <div className={styles.content}>
                <div
                  dangerouslySetInnerHTML={{ __html: post.post_content }}
                ></div>
              </div>

              <div className={styles.footer}>
                <Divider plain>THE END</Divider>

                <div style={{ textAlign: 'center' }}>
                  <Button
                    onClick={like}
                    style={{ padding: '0 32px' }}
                    type="primary"
                    shape="round"
                    icon={<LikeIcon isLike={post.isLike} />}
                    size="large"
                  >
                    {` ${post.post_like}`}
                  </Button>
                </div>

                {/* 快速切换文章 */}
                <div className={styles.paginate}>
                  <div className={styles.pItem}>
                    上一篇：{getPaginate(post.prev_post)}
                  </div>
                  <div className={styles.pItem}>
                    下一篇：{getPaginate(post.next_post)}
                  </div>
                </div>
              </div>
            </div>

            <div id="comment" className={styles.comments}>
              <h2 className={styles.title}>{commentAllCount}条评论</h2>

              <Comment
                avatar={<MyAvatar user={user} />}
                content={
                  <Editor
                    value={state.comment}
                    onSubmit={async () => {
                      if (!user?.id) {
                        dispatch({
                          type: 'global/toggleLogin',
                        });
                        return;
                      }

                      if (state.comment === '') {
                        message.error('评论内容不能为空！');
                        return;
                      }

                      dispatch({
                        type: 'comment/addComment',
                        payload: {
                          top_id: post.id,
                          content: state.comment,
                        },
                      });

                      setState((draft: any) => {
                        draft.comment = '';
                      });

                      dispatch({
                        type: 'comment/fetchData',
                        payload: {
                          id: post.id,
                        },
                      });
                    }}
                    onChange={(e: any) => {
                      const { value } = e.target;
                      setState((draft: any) => {
                        draft.comment = value;
                      });
                    }}
                  />
                }
              />

              <CommentList comment={comment} />
            </div>
          </Col>
          <Col className={classNames('gutter-row')} span={8}>
            <div className={styles.rightCard}>
              <h2 className={styles.title}>热门文章</h2>
              <div className={styles.list}>
                {hots?.map((item: any, i: number) => (
                  <Link
                    key={item.id}
                    className={styles.listItem}
                    to={`${category.alias}/post/${item.id}?cid=${category.id}`}
                  >
                    <div className={styles.number}>{i + 1}、</div>
                    <div className={styles.post}>
                      <div className={styles.postTitle}>{item.post_title}</div>
                      <div className={styles.postDesc}>{item.post_excerpt}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.rightCard}>
              <h2 className={styles.title}>分类目录</h2>
              <div className={styles.list}>
                {categoryTrees?.map((item: any, i: number) => (
                  <div key={item.id} className={styles.listItem}>
                    <Link className={styles.categoryName} to={item.alias}>
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.rightAdv}>
              <div className="img-wrap">
                <img
                  src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4464045d1d254271b7bd8c569ef5a497~tplv-k3u1fbpfcp-no-mark:480:400:0:0.awebp?"
                  alt=""
                />
              </div>
            </div>

            <div className={styles.rightAdv}>
              <div className="img-wrap">
                <img
                  src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ecba608b7bbf4ec9942b2035eb513d4f~tplv-k3u1fbpfcp-no-mark:480:400:0:0.awebp?"
                  alt=""
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div style={{ bottom: `${fixedBottom}px` }} className={styles.suspended}>
        <div onClick={favorite} className={styles.box}>
          <FavoriteIcon
            isFavorite={post.isFavorite}
            style={{ color: '#1890ff' }}
          />
        </div>
        <div onClick={like} className={styles.box}>
          <LikeIcon isLike={post.isLike} style={{ color: '#1890ff' }} />
        </div>
        <div
          onClick={() => {
            window.location.href = '#comment';
          }}
          className={styles.box}
        >
          <MessageOutlined style={{ color: '#1890ff' }} />
        </div>
      </div>
    </div>
  );
};
export default connect(
  ({ postCategory, user, post, comment, loading }: any) => ({
    postCategory,
    post: { ...post.data, isLike: post.isLike, isFavorite: post.isFavorite },
    loading,
    comment: comment.data,
    commentAllCount: comment.comment_all_count,
    user: user.data,
  }),
)(Detail);
