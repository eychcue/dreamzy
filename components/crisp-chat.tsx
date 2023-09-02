"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("a138a1e9-5d88-4c9a-8525-66aaec84073a");
  }, []);

  return null;
};