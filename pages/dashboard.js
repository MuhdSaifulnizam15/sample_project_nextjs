import { Breadcrumb, Card, Col, Layout, Row } from "antd";
import Head from "next/head";
import FooterAdmin from "../components/FooterAdmin";
import Sidebar from "../components/Sidebar";

const { Header, Content } = Layout;

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
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
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <Card
                    title="Posts"
                  >
                    <p>100</p>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    title="Users"
                  >
                    <p>10</p>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    title="Todos"
                  >
                    <p>200</p>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    title="Albums"
                  >
                    <p>100</p>
                  </Card>
                </Col>
              </Row>
            </div>
          </Content>
          <FooterAdmin />
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
