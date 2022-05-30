import { Breadcrumb, Layout, Space, Table } from "antd";
import Head from "next/head";
import Link from "next/link";
import FooterAdmin from "../../components/FooterAdmin";
import Sidebar from "../../components/Sidebar";

const { Header, Content } = Layout;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  // {
  //   title: "Username",
  //   dataIndex: "username",
  //   key: "username",
  // },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  // {
  //   title: "Address",
  //   render: (record) =>
  //     `${record.address.street} ${record.address.suite} ${record.address.city} ${record.address.zipcode}`,
  // },
  // {
  //   title: "Website",
  //   dataIndex: "website",
  //   key: "website",
  // },
  // {
  //   title: "Company Name",
  //   render: (record) => record.company.name,
  // },
  {
    title: "Action",
    key: "action",
    render: (record) => (
      <Space size="middle">
        <Link
          href={{
            pathname: "/users/[id]/[type]",
            query: { id: record.id, type: 'posts' },
          }}
        >
          <a>All Posts</a>
        </Link>
        <Link
          href={{
            pathname: "/users/[id]/albums",
            query: { id: record.id, type: 'albums' },
          }}
        >
          <a>All Albums</a>
        </Link>
        <Link
          href={{
            pathname: "/users/[id]/todos",
            query: { id: record.id, type: 'todos' },
          }}
        >
          <a>All Todos</a>
        </Link>
      </Space>
    ),
  },
];

const User = ({ users }) => {
  return (
    <>
    <Head>
    <title>User</title>
          <meta name="description" content="User" />
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
            <Breadcrumb.Item>Users</Breadcrumb.Item>
            <Breadcrumb.Item>List of User</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Table
              dataSource={users}
              columns={columns}
              scroll={{ x: "100%", y: 500 }}
              pagination={{
                pageSize: 5,
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

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();
  // console.log("users", users);

  // By returning { props: { users } }, the User component
  // will receive `users` as a prop at build time
  return {
    props: {
      users,
    },
  };
}

export default User;
