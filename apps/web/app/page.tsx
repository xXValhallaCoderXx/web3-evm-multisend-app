"use client";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <div>
        Go To Native Page
        <Link href="/app/multisend/native">Native</Link>
      </div>
    </div>
  );
};
export default HomePage;
