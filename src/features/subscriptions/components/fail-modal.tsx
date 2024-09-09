"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import Image from "next/image";
import { useCheckout } from "../api/use-checkout";
import Link from "next/link";
import { useFailModalState } from "../store/use-fail-modal";

const SubscriptionFailModal = () => {
  const { isOpen, onClose } = useFailModalState();
  if (!isOpen) {
    return null;
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex items-center space-y-4">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
          <DialogTitle className="text-center text-red-500">
            Payment Error
          </DialogTitle>
        </DialogHeader>
        <ul>
          <li className="text-sm text-gray-700">
            Information about the payment error
          </li>
        </ul>
        <DialogFooter className="pt-2 gap-y-2">
          <Link
            href="/"
            onClick={onClose}
            className="w-full h-11 rounded-lg text-red-500 bg-red-200/40 border border-red-500 font-medium flex items-center justify-center"
          >
            Continue
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionFailModal;
