import { Breadcrumb, Layout, Table } from "antd";
import Head from "next/head";
import FooterAdmin from "../../components/FooterAdmin";
import Sidebar from "../../components/Sidebar";

const { Header, Content } = Layout;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Body",
    dataIndex: "body",
    key: "body",
  },
];

const Posts = ({ comments }) => {
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
              <Breadcrumb.Item>All comments</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Table
                dataSource={comments}
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

export async function getStaticPaths() {
  // Return a list of possible value for id
  // Call an external API endpoint to get posts
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  console.log("params", params.id);
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}/comments`
  );
  const comments = await res.json();
  // console.log('comments', comments);

  if (!comments) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      comments,
    },
  };
}

export default Posts;
