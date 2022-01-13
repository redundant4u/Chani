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
      <div className="header-divider">
        <Divider />
      </div>
      <div className="category">
        <Menu text>
          <Menu.Item
            name="List"
            onClick={() => router.push("/views/list", "/list")}
          />
          <Menu.Item
            name="Chart"
            onClick={() => router.push("/views/list", "/list")}
          />
        </Menu>
      </div>
    </div>
  );
};

export default Header;
