"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBilling } from "@/features/subscriptions/api/use-billing";
import { useGetSubscription } from "@/features/subscriptions/api/use-get-subscription";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
import { useSubscriptionModalState } from "@/features/subscriptions/store/use-subscription-modal";
import { CreditCard, Crown, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const UserButton = () => {
  const session = useSession();
  const { onOpen } = useSubscriptionModalState();
  // const { data: subscription, isLoading: isLoadingSubscription } =
  //   useGetSubscription();
  const { isLoading, shouldBlock } = usePaywall();
  const mutationBilling = useBilling();
  const onClick = () => {
    if (shouldBlock) {
      onOpen();
      return;
    }
    mutationBilling.mutate();
  };
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        {!shouldBlock && (
          <div className="absolute -top-1 -left-1 z-10">
            <Crown className="size-4 fill-yellow-500 text-yellow-500" />
          </div>
        )}
        <Avatar>
          <AvatarImage
            src={session?.data?.user?.image || ""}
            alt={(session?.data?.user?.email as string) || "Avatar"}
          />
          <AvatarFallback className="bg-blue-500 text-white">CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuItem className="cursor-pointer" onClick={onClick}>
          <div className="flex items-center gap-x-2 h-9">
            <CreditCard className="size-4" />
            <p className="text-sm">Billing</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            signOut();
          }}
        >
          <div className="flex items-center gap-x-2 h-9">
            <LogOut className="size-4" />
            <p className="text-sm">Log out</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
