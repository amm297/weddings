import { Timer } from "./countdown/Timer";
import { WeddingLayout } from "./WeddingLayout";

export function CountdownTimer({ isEven }: { isEven: boolean }) {
  return (
    <WeddingLayout id="countdown" isEven={isEven}>
      <Timer />
    </WeddingLayout>
  );
}
