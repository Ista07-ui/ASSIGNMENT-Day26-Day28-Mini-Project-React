import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/login");
      } else {
        setVerified(true);
      }
    }, [router]);

    if (!verified) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
