import { FC } from 'react';
import { Menu, Input } from 'semantic-ui-react';

const Header: FC = () => {
  return (
    <Menu secondary>
      <Menu.Item name="home" />
      <Menu.Item name="messages" />
      <Menu.Item name="friends" />
      <Menu.Menu position="right">
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
        <Menu.Item name="logout" />
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
