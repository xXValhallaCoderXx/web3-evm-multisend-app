"use client";
import Link from "next/link";

import { useRouter } from "next/navigation";
const HomePage = () => {
  return (
    <div>
      <div>
        Go To Native Page
        <Link href="/multisend/native">Native</Link>
      </div>
      <div>
        Go To Token Page
        <Link href="/multisend/token">Token</Link>
      </div>
    </div>
  );
};
export default HomePage;
