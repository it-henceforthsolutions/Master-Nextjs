import { GetServerSideProps } from "next";
import React from "react";

// details page routing
const view = (props: any) => {
  // get data from serverside through props

  const handleUpdate = async (status: any) => {
    const payload = {
      status,
      type: "All",
    };
    try {
      let apiRes = `apiUrl`;
      // here we update the data through state
    } catch (error) {}
  };

  

  return <div>view</div>;
};

export default view;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const apiRes: any = "apiurl";
    return { props: { ...apiRes.data } };
  } catch (error) {
    return {
      props: {
        storeDetail: null,
        error: "Failed to fetch detail",
      },
    };
  }
};
