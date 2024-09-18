import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react'


// details page routing
const view = (props:any) => {
    // get data from serverside through props

    const router = useRouter()
    const {slug} = router.query
    console.log(slug,"slug"); // here we get a array of multple slugs
    
  return (
    <div>view</div>
  )
}

export default view

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
      const apiRes:any = "apiurl";
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