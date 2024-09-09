"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import Image from "next/image";
import Link from "next/link";
import { useSuccessModalState } from "../store/use-success-modal";

const SubscriptionSuccessModal = () => {
  const { isOpen, onClose } = useSuccessModalState();
  if (!isOpen) {
    return null;
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex items-center space-y-4">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
          <DialogTitle className="text-center">
            Payment successfully completed
          </DialogTitle>
        </DialogHeader>
        <ul>
          <li className="text-sm text-gray-700">
            Information about the payment successfully completed
          </li>
        </ul>
        <DialogFooter className="pt-2 gap-y-2">
          <Link
            href="/"
            onClick={onClose}
            className="w-full h-11 rounded-lg bg-green-500 text-white font-medium flex items-center justify-center"
          >
            Continue
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionSuccessModal;
