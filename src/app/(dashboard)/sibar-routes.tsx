"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Crown, Home, MessageCircleQuestion } from "lucide-react";
import SidebarItem from "./sibar-item";
import { usePathname } from "next/navigation";
import { useSubscriptionModalState } from "@/features/subscriptions/store/use-subscription-modal";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
import { useCheckout } from "@/features/subscriptions/api/use-checkout";
import { useBilling } from "@/features/subscriptions/api/use-billing";

const SidebarRoute = () => {
  const pathname = usePathname();
  const { isLoading, shouldBlock } = usePaywall();
  const { onOpen } = useSubscriptionModalState();
  const mutation = useCheckout();
  const mutationBilling = useBilling();

  const onClick = () => {
    if (shouldBlock) {
      onOpen();
      return;
    }
    mutationBilling.mutate();
  };

  return (
    <div className="flex flex-col">
      {shouldBlock && !isLoading && (
        <>
          <Button
            variant="outline"
            className="border-0 hover:bg-white hover:opacity-70 transition flex items-center gap-2 h-11"
            onClick={() => mutation.mutate()}
          >
            <Crown className="size-4 fill-yellow-500 text-yellow-500" />
            Upgrade to Image AI Pro
          </Button>
          <Separator className="my-4"></Separator>
        </>
      )}

      <SidebarItem
        label="Home"
        href="/"
        isActive={pathname === "/"}
        icon={Home}
      />
      <Separator className="my-4"></Separator>
      <ul className="space-y-2">
        <SidebarItem
          label="Billing"
          href="/"
          icon={CreditCard}
          onClick={onClick}
        />
        <SidebarItem
          label="Get help"
          href="mailto:support@ntd171002.com"
          icon={MessageCircleQuestion}
        />
      </ul>
    </div>
  );
};

export default SidebarRoute;
