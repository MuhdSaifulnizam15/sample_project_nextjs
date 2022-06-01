import { Breadcrumb, Layout, Space, Table } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useQuery } from "react-query";
import FooterAdmin from "../../components/FooterAdmin";
import Sidebar from "../../components/Sidebar";

const { Header, Content } = Layout;

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Body",
    dataIndex: "body",
    key: "body",
  },
  {
    title: "Action",
    key: "action",
    render: (record) => (
      <Space size="middle">
        <Link
          href={{
            pathname: "/posts/[id]",
            query: { id: record.id },
          }}
        >
          <a>See All Comments</a>
        </Link>
        <a>Delete</a>
      </Space>
    ),
  },
];

const fetchPostListFromAPI = async () => {
  const res = await fetch("/api/posts");
  return res.json();
};

const Post = () => {
  const { data, status } = useQuery("posts", fetchPostListFromAPI);
  // console.log("data:", data);
  // console.log("status", status);

  return (
    <>
      <Head>
        <title>Posts</title>
        <meta name="description" content="Posts" />
      </Head>

      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sidebar />
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          />
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >
              <Breadcrumb.Item>Posts</Breadcrumb.Item>
              <Breadcrumb.Item>List of Post</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Table
                dataSource={data}
                columns={columns}
                scroll={{ x: "100%", y: 500 }}
                pagination={{
                  pageSize: 10,
                }}
              />
            </div>
          </Content>
          <FooterAdmin />
        </Layout>
      </Layout>
    </>
  );
};

// // This function gets called at build time
// export async function getStaticProps() {
//   // Call an external API endpoint to get posts
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//   const posts = await res.json();
//   // console.log("posts", posts);

//   // By returning { props: { posts } }, the Post component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       posts,
//     },
//   };
// }

export default Post;
