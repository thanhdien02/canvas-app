import { useGetSubscription } from "@/features/subscriptions/api/use-get-subscription";
import { useSubscriptionModalState } from "../store/use-subscription-modal";

export const usePaywall = () => {
  const { 
    data: subscription,
    isLoading: isLoadingSubscription,
  } = useGetSubscription();

  const subscriptionModal = useSubscriptionModalState();

  const shouldBlock = isLoadingSubscription || !subscription?.active;

  return {
    isLoading: isLoadingSubscription,
    shouldBlock,
    triggerPaywall: () => {
      subscriptionModal.onOpen();
    },
  };
};
