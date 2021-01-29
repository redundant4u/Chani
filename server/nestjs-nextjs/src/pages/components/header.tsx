import { FC } from 'react';
import Link from 'next/link';

const Header: FC = () => {
    return (
        <div className="header">
            <div className="header-title">
                <Link href="/views/home" as="/">CHANI</Link>
            </div>
            <div className="category">
                <ul className="list-inline">
                    <Link href="/table" as="/table"><li className="list-inline-item">table</li></Link>
                    <Link href="/chart" as="/chart"><li className="list-inline-item">chart</li></Link>
                    <Link href="/login" as="/login"><li className="list-inline-item">login</li></Link>
                </ul>
            </div>
            <div>
                <form method="POST" action="/">
                        <input type="text" className="form-control search" name="search"></input>
                </form>
            </div>
        </div>
    );
};
export default Header;