import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
// import { isLoggedInVar, logUserOut } from "../apollo";

// export const ME_QUERY = gql`
//   query me {
//     me {
//       id
//       username
//       avatar
//     }
//   }
// `;

const useMe = () => {
  //   const hasToken = useReactiveVar(isLoggedInVar);
  //   const { data } = useQuery(ME_QUERY, {
  //     skip: !hasToken,
  //   });
  //   useEffect(() => {
  //     if (data?.me === null) {
  //       logUserOut();
  //     }
  //   }, [data]);
  //   return { data };
  return 1;
};

export default useMe;
