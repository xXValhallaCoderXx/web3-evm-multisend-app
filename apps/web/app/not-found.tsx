"use client";
import { useRouter } from "next/navigation";
const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div>
      NOT FOUND
      <button onClick={() => router.push("/")}>Go Home</button>
    </div>
  );
};
export default NotFoundPage;
