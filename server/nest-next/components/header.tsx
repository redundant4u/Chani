import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

const Header: FC = () => {
  const router = useRouter();

  return (
    <div className="header dark:text-gray-300">
      <div className="header-title">
        <Link href="/views/home" as="/">
          CHANI
        </Link>
      </div>
      <hr className="dark:bg-gray-300" />
      <div className="category flex space-x-4">
          <div><Link href="/views/list" as="/list">List</Link></div>
          <div><Link href="/views/chart" as="/chart">Chart</Link></div>
      </div>
    </div>
  );
};

export default Header;
