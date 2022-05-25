import { useState } from "react";
import { FileOutlined, PieChartOutlined, UserOutlined, DesktopOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Image from "next/image";
import styles from '../styles/Sidebar.module.css'
import Link from "next/link";
import { useRouter } from "next/router";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", "dashboard", <PieChartOutlined />),
  getItem("Users", "users", <UserOutlined />,), 
  getItem("Posts", "posts", <DesktopOutlined />),
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      theme="light"
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className={styles.logo}>
        <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={150} height={50} />
        </Link>
      </div>
      <Menu
        theme="light"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        onClick={(item) => router.push(`/${item.key}`)}
      />
    </Sider>
  );
};

export default Sidebar;
