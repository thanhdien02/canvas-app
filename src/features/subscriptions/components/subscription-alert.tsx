"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFailModalState } from "../store/use-fail-modal";
import { useSuccessModalState } from "../store/use-success-modal";


export const SubscriptionAlert = () => {
  const params = useSearchParams();

  const { onOpen: onOpenFail } = useFailModalState();
  const { onOpen: onOpenSuccess } = useSuccessModalState();

  const canceled = params.get("canceled");
  const success = params.get("success");

  useEffect(() => {
    if (canceled) {
      onOpenFail();
    }

    if (success) {
      onOpenSuccess();
    }
  }, [canceled, onOpenFail, success, onOpenSuccess]);

  return null;
};
