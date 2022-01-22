import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { Menu, Input, Divider, Container } from "semantic-ui-react";

const Header: FC = () => {
  const router = useRouter();

  return (
    <div className="header">
      <div className="header-title">
        <Link href="/views/home" as="/">
          CHANI
        </Link>
      </div>
      <hr />
      <div className="category flex space-x-2">
          <div><Link href="/views/list" as="/list">List</Link></div>
          <div><Link href="/views/chart" as="/chart">Chart</Link></div>
      </div>
    </div>
  );
};

export default Header;
