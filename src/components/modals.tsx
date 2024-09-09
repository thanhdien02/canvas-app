import SubscriptionFailModal from "@/features/subscriptions/components/fail-modal";
import SubscriptionModal from "@/features/subscriptions/components/subscription-modal";
import SubscriptionSuccessModal from "@/features/subscriptions/components/success-modal";

const Modals = () => {
  return (
    <>
      <SubscriptionModal />
      <SubscriptionFailModal />
      <SubscriptionSuccessModal />
    </>
  );
};

export default Modals;
