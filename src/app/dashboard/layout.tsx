"use client";

import { Layout, Menu, Button } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import {
  DashboardOutlined,
  BulbOutlined,
  SettingOutlined,
  LockOutlined,
  ThunderboltOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  WifiOutlined,
  BellOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

// Define the menu item type
interface MenuItem {
  key: string;
  label: string;
  icon: ReactNode;
  path: string;
  children?: MenuItem[];
}

// Sidebar navigation items for Smart Home IoT
const menuItems: MenuItem[] = [
  {
    key: "home",
    label: "Home Overview",
    icon: <HomeOutlined />,
    path: "/dashboard/home",
  },
  {
    key: "devices",
    label: "Devices",
    icon: <BulbOutlined />,
    path: "/dashboard/devices",
  },
  {
    key: "automation",
    label: "Automation",
    icon: <WifiOutlined />,
    path: "/dashboard/automation",
  },
  {
    key: "energy",
    label: "Energy Monitoring",
    icon: <ThunderboltOutlined />,
    path: "/dashboard/energy",
  },
  {
    key: "security",
    label: "Security & Cameras",
    icon: <VideoCameraOutlined />,
    path: "/dashboard/security",
  },
  {
    key: "alerts",
    label: "Alerts & Notifications",
    icon: <BellOutlined />,
    path: "/dashboard/alerts",
  },
  {
    key: "settings",
    label: "Settings",
    icon: <SettingOutlined />,
    path: "/dashboard/settings",
    children: [
      {
        key: "profile",
        label: "Profile",
        icon: <DashboardOutlined />,
        path: "/settings/profile",
      },
      {
        key: "security",
        label: "Security",
        icon: <LockOutlined />,
        path: "/settings/security",
      },
    ],
  },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    const activeItem = menuItems.find((item) => pathname.startsWith(item.path));
    if (activeItem?.children) {
      setOpenKeys([activeItem.key]);
    }
  }, [pathname]);

  return (
    <Layout className="min-h-screen">
      <Sider collapsible collapsed={collapsed} trigger={null} theme="light">
        <div className="h-16 flex items-center justify-center bg-white px-4">
          <img
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fsmart-home-logo&psig=AOvVaw26Up7CXaF_ahM5NGDledEr&ust=1742281328860000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJjb_PHFkIwDFQAAAAAdAAAAABAE"
            alt="Smart Home Dashboard"
            className="h-8 w-auto"
          />
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[pathname]}
          openKeys={openKeys}
          onOpenChange={(keys) => setOpenKeys(keys)}
        >
          {menuItems.map((item) =>
            item.children ? (
              <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((child) => (
                  <Menu.Item key={child.path} icon={child.icon}>
                    <Link href={child.path}>{child.label}</Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.path} icon={item.icon}>
                <Link href={item.path}>{item.label}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header className="!bg-white shadow p-4 flex justify-between items-center">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <h1 className="text-xl font-semibold">Smart Home Dashboard</h1>
        </Header>
        <Content className="p-6 bg-gray-100 !min-h-[90vh]">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
