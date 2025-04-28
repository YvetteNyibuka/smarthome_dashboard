"use client";

import {
  Layout,
  Menu,
  Button,
  Badge,
  Dropdown,
  Modal,
  Typography,
  Tooltip,
} from "antd";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import {
  DashboardOutlined,
  BulbOutlined,
  SettingOutlined,
  LockOutlined,
  ThunderboltOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  WifiOutlined,
  BellOutlined,
  DownOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { FiArrowDown, FiArrowDownCircle } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";
import { getFromLocalStorage } from "../Config/auth";

const { Text, Title } = Typography;
const { Header, Sider, Content } = Layout;

interface MenuItem {
  key: string;
  label: string;
  icon: ReactNode;
  path: string;
  children?: MenuItem[];
}

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
    key: "alerts",
    label: "Notifications",
    icon: <BellOutlined />,
    path: "/dashboard/alerts",
  },
  {
    key: "subscriptions",
    label: "Subscriptions",
    icon: <LockOutlined />,
    path: "/dashboard/subscription-plan",
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
        path: "profile",
      },
      {
        key: "security",
        label: "Security",
        icon: <LockOutlined />,
        path: "security",
      },
    ],
  },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPlanModalVisible, setIsPlanModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    const activeItem = menuItems.find((item) => pathname.startsWith(item.path));
    if (activeItem?.children) {
      setOpenKeys([activeItem.key]);
    }
  }, [pathname]);

  const showModal = () => setIsModalVisible(true);
  const handleModalCancel = () => setIsModalVisible(false);
  const showPlanModal = () => setIsPlanModalVisible(true);
  const handlePlanModalCancel = () => setIsPlanModalVisible(false);

  return (
    <Layout className="min-h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        theme="light"
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className="h-16 flex items-center justify-center bg-white px-4">
          <img
            src="/logo.png"
            alt="Smart Home Dashboard"
            className="h-12 w-auto"
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
        <ProHeader
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
          onAddBusiness={() => router.push("/dashboard/add-business")}
          notificationCount={5}
          username="John Doe"
          avatarUrl="https://i.pravatar.cc/40"
        />
        <Content className="p-6 bg-gray-100 !min-h-[90vh]">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;

interface ProHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
  onAddBusiness?: () => void;
  notificationCount?: number;
  username?: string;
  avatarUrl?: string;
}

const ProHeader = ({
  collapsed,
  onToggle,
  onAddBusiness,
  notificationCount = 0,
  username = "Admin",
  avatarUrl = "https://i.pravatar.cc/40",
}: ProHeaderProps) => {
  const [isPlanModalVisible, setIsPlanModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const router = useRouter();

  const handlePlanModalCancel = () => {
    setIsPlanModalVisible(false);
  };
  interface SubscriptionPlan {
    id: string;
    name: string;
    price: number;
    features: string[];
    isPopular: boolean;
  }
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(
    null
  );

  const iotSubscriptionPlans: SubscriptionPlan[] = [
    {
      id: "free",
      name: "Free Plan",
      price: 0,
      features: [
        "Basic Device Monitoring",
        "Mobile App Access",
        "Up to 3 Devices",
        "Community Support",
      ],
      isPopular: false,
    },
    {
      id: "starter",
      name: "Starter Plan",
      price: 9.99,
      features: [
        "Up to 10 Devices",
        "Energy Usage Insights",
        "Basic Automation Scenes",
        "Push Notifications",
      ],
      isPopular: false,
    },
    {
      id: "pro",
      name: "Pro Plan",
      price: 19.99,
      features: [
        "Up to 25 Devices",
        "Advanced Automation Rules",
        "Camera & Security Integration",
        "Priority Support",
      ],
      isPopular: true,
    },
    {
      id: "family",
      name: "Family Plan",
      price: 29.99,
      features: [
        "Up to 50 Devices",
        "Family Profiles",
        "Energy Optimization",
        "Multiple Admin Roles",
      ],
      isPopular: false,
    },
    {
      id: "enterprise",
      name: "Enterprise Plan",
      price: 99.99,
      features: [
        "Unlimited Devices",
        "Custom Automations",
        "Dedicated Account Manager",
        "24/7 Premium Support",
      ],
      isPopular: false,
    },
  ];

  const getLoggedInUser = () => {
    if (typeof window === "undefined") return;
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    return user;
  };

  const onUpgrade = (planId: string) => {
    const selectedPlan = iotSubscriptionPlans.find(
      (plan) => plan.id === planId
    );
    if (selectedPlan) {
      setSelectedPlan(selectedPlan);
      setIsModalVisible(true);
    }
  };

  const loggedInUser = getLoggedInUser();

  const logout = () => {
    if (typeof window === "undefined") return
    localStorage.removeItem("loggedInUser");
    router.push("/login");
  };

  const handleGoToProfile = () => {
    router.push("/dashboard/settings/profile");
  };

  const savedPlan = getFromLocalStorage("selectedPlan");

  return (
    <header className="!bg-white w-full p-4 shadow flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
        />
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          <h1 className="text-xl font-semibold text-sky-600">
            Smart IoT Dashboard
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <SelectedPlanInHeader
          selectedPlan={savedPlan + " Plan" || "Free Plan"}
          onShowPlanModal={() => {
            setIsPlanModalVisible(true);
            setIsModalVisible(true);
          }}
        />
        <Badge
          count={notificationCount}
          className="cursor-pointer"
          onClick={() => {
            router.push("/dashboard/alerts");
          }}
        >
          <BellOutlined className="text-gray-700 text-xl" />
        </Badge>
        <Dropdown
          menu={{
            items: [
              //   link to profile, and change password
              {
                key: "profile",
                label: (
                  <div
                    onClick={handleGoToProfile}
                    className="flex items-center gap-2"
                  >
                    <SettingOutlined />
                    Profile
                  </div>
                ),
              },
              {
                key: "logout",
                label: (
                  <div
                    onClick={logout}
                    className="flex items-center gap-2 text-red-500"
                  >
                    <LockOutlined />
                    Logout
                  </div>
                ),
              },
            ],
          }}
          trigger={["click"]}
        >
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src={
                "https://res.cloudinary.com/nrob/image/upload/v1721084009/tip%20top%20consultancy/xorguxv2x1bwferxtkfo.webp"
              }
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <div className="text-left flex items-center justify-center gap-2 leading-tight">
              <div className="text-gray-700 font-medium">
                {loggedInUser?.fullName.split(" ")[0] || "User"}
              </div>
              <FaAngleDown className="text-gray-500 text-sm" />
            </div>
            <DownOutlined className="text-black" />
          </div>
        </Dropdown>
      </div>
      <Modal
        title="Choose a Subscription Plan"
        open={isPlanModalVisible}
        onCancel={handlePlanModalCancel}
        footer={null}
        centered
        width="80%"
        height="80%"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {iotSubscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`border rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 ${
                selectedPlan?.id === plan.id
                  ? "border-sky-500 bg-blue-50"
                  : "bg-white"
              }`}
              onClick={() => {
                onUpgrade(plan.id);
                // setIsPlanModalVisible(false);
                setIsModalVisible(true);
                setSelectedPlan(plan);
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="text-2xl font-semibold text-gray-800">
                  {plan.name} - ${plan.price.toFixed(2)} / month
                </div>
                {plan.isPopular && (
                  <span className="px-4 py-1 text-xs bg-sky-500 text-white rounded-full uppercase font-semibold">
                    Popular
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-600 mb-6">
                <div className="font-medium text-gray-800 mb-2">Features:</div>
                <ul className="list-disc pl-5 space-y-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                type="primary"
                onClick={() => onUpgrade(plan.id)}
                block
                className={`transition-all duration-200 ${
                  plan.isPopular
                    ? "bg-sky-600 text-white hover:bg-sky-700"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                Choose {plan.name}
              </Button>
            </div>
          ))}
        </div>
      </Modal>
    </header>
  );
};

const SelectedPlanInHeader = ({
  selectedPlan,
  onShowPlanModal,
}: {
  selectedPlan: string;
  onShowPlanModal: () => void;
}) => {
  const router = useRouter();

  return (
    <div className="flex capitalize gap-4">
      <Tooltip title={`Current plan: ${selectedPlan}`}>
        <Button
          type="text"
          onClick={() => {
            router.push("/dashboard/subscription-plan");
          }}
          icon={<InfoCircleOutlined />}
          className="text-gray-600 capitalize"
        >
          {selectedPlan}
        </Button>
      </Tooltip>
    </div>
  );
};
