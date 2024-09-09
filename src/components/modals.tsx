import SubscriptionModal from "@/features/subscriptions/components/subscription-modal";

interface ModelProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modals = () => {
  return (
    <>
      <SubscriptionModal />
    </>
  );
};

export default Modals;
