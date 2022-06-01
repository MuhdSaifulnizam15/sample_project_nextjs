import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { Breadcrumb, Layout, Table } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FooterAdmin from "../../components/FooterAdmin";
import Sidebar from "../../components/Sidebar";

const { Header, Content } = Layout;

const createCollumns = (path = "posts") => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: path === "todos" ? "Status" : "Body",
      render: (record) =>
        path !== "todos" ? (
          record.body
        ) : 
          record.completed ? <CheckCircleTwoTone twoToneColor="#52c41a" style={{ padding: 5, fontSize: 20 }} /> : <CloseCircleTwoTone twoToneColor="#eb2f96" style={{ padding: 5, fontSize: 20 }}/>
    },
    // {
    //   title: "Company Name",
    //   render: (record) => record.company.name,
    // },
    // {
    //   title: "Body",
    //   dataIndex: "body",
    //   key: "body",
    // },
  ];

  return columns;
};

const Users = () => {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (router.query.id) {
      _getData(router.query.id);
    }
  }, [router.query.id]);

  const _getData = async (cid) => {
    const res = await fetch(`/api/users/${cid[0]}/${cid[1]}`);
    const list = await res.json();
    console.log('list', list);
    list.length > 0 ? setData(list) : setData([]);
  };

  return (
    <>
      <Head>
        <title>Users</title>
        <meta name="description" content="Users" />
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
              <Breadcrumb.Item>All {router.query.id && router.query.id[1]}</Breadcrumb.Item>
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
                columns={createCollumns(router.query.id ? router.query.id[1] : "posts")}
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

// export async function getStaticPaths() {
//   // Return a list of possible value for id
//   // Call an external API endpoint to get posts
//   const res = await fetch("https://jsonplaceholder.typicode.com/users");
//   const posts = await res.json();

//   // Get the paths we want to pre-render based on posts
//   const paths = posts.map((post) => ({
//     params: { id: [post.id.toString(), "todos"] },
//   }));
//   console.log("paths", paths);

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: true };
// }

// export async function getStaticProps({ params }) {
//   // console.log("params", params);
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/users/${params.id[0]}/${params.id[1]}`
//   );
//   const arr = await res.json();
//   // console.log('arr', arr);

//   if (!arr) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       arr,
//     },
//   };
// }

export default Users;
