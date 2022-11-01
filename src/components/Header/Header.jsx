import React from "react";
import s from './Header.module.css'

const Header = () => {
    return (
        <div className={s.wrapper}>
          <div className={s.header}>Todo List</div>
        </div>
    );
}
export default Header;