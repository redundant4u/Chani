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
                    <Link href="/views/list" as="/list"><li className="list-inline-item">list</li></Link>
                    <Link href="/views/chart" as="/chart"><li className="list-inline-item">chart</li></Link>
                    <Link href="/views/login" as="/login"><li className="list-inline-item">login</li></Link>
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