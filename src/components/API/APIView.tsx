import React, { FC } from "react";
import { useAPI } from "./useAPIReducer";

const APIView: FC = () => {
  const { apiStates } = useAPI();
  const {} = apiStates;
  return <div></div>;
};

export default APIView;
