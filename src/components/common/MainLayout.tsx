import {
  Layout,
  Sider,
  TypographyText,
} from "@/lib/AntRegistry";
import { useContext, useState } from "react";
import { GlobalContext } from "@/context/Provider";


// Create a common layout for Header & footer & sidebar if needed
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { userInfo } = useContext(GlobalContext);
  return (
    <>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={
            collapsed
              ? { borderRadius: 16, minWidth: 260, maxWidth: 260, width: 260 }
              : {
                borderRadius: 16,
                marginRight: 20,
                minWidth: 260,
                maxWidth: 260,
                width: 260,
              }
          }
        >
          <div className="profile_details mb-4 d-flex align-items-center gap-2">
            <div>
              <TypographyText ellipsis className="fs-14 fw-semibold d-block">
                {userInfo?.name ? userInfo?.name : userInfo?.first_name ?
                  `${userInfo?.first_name} ${userInfo?.last_name}` : "N/A"}
              </TypographyText>
            </div>
          </div>
        </Sider>
      </Layout>
    </>
  );
};

export default MainLayout;
