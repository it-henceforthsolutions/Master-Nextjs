import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { message, theme, Tour } from "antd";
import { ConfigProvider } from "@/lib/AntRegistry";
import { useRouter } from "next/router";
type ToastFunction = (msg: any) => void;

interface CommonContextType {
  loading: boolean;
  requestNotification: () => string;
  initLoginWithGoogle: (str: string) => string;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  Toast: {
    error: ToastFunction;
    success: ToastFunction;
    warning: ToastFunction;
  };
  userInfo: any;
  logout: Function;
  user_info: any;
  setUserInfo: any;
}
export const GlobalContext = createContext({} as CommonContextType);
type GlobleContextProviderProps = {
  children: ReactNode;
  access_token: string;
  user_info: any;
  userType: string;
  signInPrivacy: string;
  theme?: {
    direction: string;
    colorPrimary: string;
  };
};

const { defaultAlgorithm } = theme;

function GlobalProvider(props: GlobleContextProviderProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(props?.user_info);
  const [messageApi, contextHolder] = message.useMessage();


  const success = (success: any) => {
    messageApi.open({
      type: "success",
      content: success,
    });
  };
 

  const error = (error: any) => {
    let errorBody = error?.response?.body;
    let message = errorBody?.message;
    let error_message = errorBody?.error_description;
    messageApi.open({
      type: "error",
      content: message
        ? message
        : typeof error_message == "string"
          ? error_message
          : error_message
            ? JSON.stringify(error_message)
            : JSON.stringify(error),
      duration: 3,
    });
    setTimeout(messageApi.destroy, 3000);
  };

  const warning = (warning: any) => {
    messageApi.open({
      type: "warning",
      content: warning,
    });
  };

  const Toast = {
    success,
    warning,
    error,
  };


  const loadGoogleMapScript = (callback: any) => {
    if (
      typeof (window as any).google === "object" &&
      typeof (window as any).google.maps === "object"
    ) {
      callback();
    } else {
      const googleMapScript = document.createElement("script");
      googleMapScript.src = `https://accounts.google.com/gsi/client`;
      window.document.body.appendChild(googleMapScript);
      googleMapScript.addEventListener("load", callback);
    }
  };

  const loginWithSocial = async (social_type: string, social_token: string) => {
    debugger;
      try {
        const items = {
          social_type,
          social_token,
        } as any;
      } catch (error: any) {
        Toast.error(error);
      }
  };

  const loginWithGoogle = async (response: any) => {
    await loginWithSocial("GOOGLE", response.credential);
  };

  const initLoginWithGoogle = (id: string) => {
    loadGoogleMapScript(() => {
      const google = (window as any).google;
      google?.accounts?.id?.initialize({
        client_id:
          "xxxxxxx",
        callback: loginWithGoogle,
        cancel_on_tap_outside: false,
      });
      google?.accounts?.id?.renderButton(document.getElementById(id), {
        theme: "dark",
        size: "large",
        type: "standard",
        width: "400px",
        Shape: "pill",
        text: "continue_with",
      });
      // google?.accounts?.id?.prompt()
    });
  };

  const uploadImages = async (raize:any) => {
    debugger;
    const images = [{}] as Array<any>;
    if (raize) {
      await Promise.all(
        raize.map(async (res: any, index: number) => {
          try {
            if (res) {
              const apiRes = "apicall"
              const data:any = apiRes;
              images.push({ img_url: data.file_name, key: res.key });
            }
          } catch (e) { }
        })
      );
    }

    return images;
  };

  return (
    <GlobalContext.Provider
      value={
        {
          ...props,
          loading,
          setLoading,
          uploadImages,
          Toast,
          setUserInfo,
          userInfo,
          initLoginWithGoogle,
        } as any
      }
    >
      <ConfigProvider
        theme={{
          algorithm: defaultAlgorithm,
          components: {
            DatePicker: {
              lineWidth: 1,
              borderRadiusLG: 40,
              borderRadius: 40,
              colorTextPlaceholder: "#828282",
              fontSize: 14,
              controlHeight: 36,
              controlHeightLG: 40,
              fontWeightStrong: 600,
              colorBorder: "transparent",
              colorBgContainer: "rgba(255, 255, 255, 0.5)",
            },
            Form: {
              verticalLabelPadding: 0,
              labelColor: "#121212",
              itemMarginBottom: 16,
              labelHeight: 10,
            },
            InputNumber: {
              lineWidth: 2,
            },
            Input: {
              lineWidth: 1,
              colorBorder: "transparent",
              borderRadiusLG: 40,
              borderRadius: 40,
              borderRadiusOuter: 40,
              borderRadiusSM: 40,
              controlHeightLG: 40,
              controlHeight: 36,
              colorBgContainer: "rgba(255, 255, 255, 0.5)",
              colorTextPlaceholder: "#828282",
              fontSize: 14,
              colorText: "#121212",
              paddingInlineLG: 20,
              fontWeightStrong: 400,
              colorFillTertiary: "#EDEDED",
            },

            Select: {
              lineWidth: 1,
              borderRadiusOuter: 40,
              borderRadius: 40,
              borderRadiusLG: 40,
              colorBorder: "transparent",
              colorText: "#828282",
              colorTextPlaceholder: "#828282",
              fontSize: 14,
              controlHeightLG: 40,
              controlHeight: 36,
              colorBgContainer: "rgba(255, 255, 255, 0.5)",
            },
            Card: {
              paddingContentHorizontal: 0,
              paddingContentVertical: 0,
              colorBorderSecondary: "#E6E6E6",
              padding: 0,
              borderRadius: 12,
              borderRadiusLG: 12,
              colorBgContainer: "#ffffff",
              paddingLG: 0,
              paddingMD: 0,
              paddingSM: 0,
            },
            Radio: {
              dotSize: 9,
              radioSize: 18,
            },

            Button: {
              borderRadiusLG: 40,
              borderRadiusSM: 40,
              borderRadius: 40,
              lineWidth: 1,
              fontSize: 14,
              fontSizeLG: 14,
              controlHeightLG: 40,
              controlHeight: 36,
              controlHeightSM: 34,
              borderColorDisabled: "transparent",
              colorBgContainerDisabled: "#fdc8467a",
              colorTextDisabled: "#fff",
              fontWeight: 500,
              defaultColor: "#000000",
              defaultBorderColor: "#000000",
              defaultBg: "transparent",
              colorErrorBg: "yellow",
            },
            Tabs: {
              fontWeightStrong: 800,
              fontSize: 16,
              colorText: "#828282",
            },
            Pagination: {
              borderRadius: 8,
              // itemActiveBg: '#FDC846',
              colorPrimary: "#FDC846",
              colorPrimaryHover: "#FDC846",
            },
            Upload: {
              margin: 20,
              colorError: "#E6E6E6",
            },
            Typography: {
              fontSizeHeading1: 60,
              fontSizeHeading2: 32,
              fontSizeHeading3: 26,
              fontSizeHeading4: 24,
              fontSize: 14,
              fontSizeHeading5: 20,
              colorText: "#121212",
              colorTextHeading: "#121212",
              titleMarginTop: 0,
              colorTextSecondary: "#828282",
            },
            Switch: {
              handleSizeSM: 10,
              trackPadding: 4,
              colorTextQuaternary: "#EF8E8B",
              trackHeightSM: 20,
              trackMinWidthSM: 32,
            },
            Dropdown: {
              padding: 0,
              paddingLG: 0,
              controlItemBgHover: "transparent",
              boxShadow: "0px 4px 24px 0px #0000000A",
              colorBgElevated: "#ffffff",
              colorBorder: "#1A1A1A",
              colorText: "#121212",
              borderRadius: 12,
              borderRadiusLG: 12,
              borderRadiusSM: 12,
              borderRadiusXS: 12,
            },
            Rate: {
              controlHeight: 50,
              controlHeightLG: 50,
            },
            Checkbox: {
              lineWidth: 2,
              borderRadiusLG: 0,
              borderRadiusSM: 0,
            },
            Breadcrumb: {
              lastItemColor: "#545454",
              linkHoverColor: "#545454",
              colorText: "#545454",
            },
            Divider: {
              lineWidth: 1,
              fontSize: 26,
              colorText: "#000000",
            },
            Collapse: {
              borderRadiusLG: 8,
              borderRadius: 8,
              colorBgElevated: "#000000",
              colorBorder: "#E5E5E5",
              colorFillAlter: "#000000",
              colorTextHeading: "#121212",
              fontSize: 16,
            },
            Modal: {
              borderRadius: 8,
              borderRadiusLG: 8,
              contentBg: "#ffffff",
              headerBg: "#ffffff",
              titleColor: "#000000",
            },
            Table: {
              colorTextHeading: "#828282",
              fontSize: 14,
              borderRadius: 24,
              headerBg: "rgba(246, 243, 254, 1)",
              colorBgContainer: "transparent",
              borderColor: "transparent",
              colorText: "#121212",
            },
            Statistic: {
              colorText: "#fff",
            },
            Spin: {
            },
            Tag: {
              borderRadius: 40,
              borderRadiusLG: 40,
              borderRadiusSM: 40,
            },
            Progress: {
            },
          },
        }}
      >
        {props.children}
        {contextHolder}
      </ConfigProvider>
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
