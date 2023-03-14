import React from "react";
import { Nav, NavLink, NavMenu }
	from "./NavBarElements";

const Navbar = () => {
return (
	<>
	<Nav>
		<NavMenu>
		{/* <NavLink to="/about" activeStyle>
			About
		</NavLink>
		<NavLink to="/contact" activeStyle>
			Contact Us
		</NavLink>
		<NavLink to="/blogs" activeStyle>
			Blogs
		</NavLink> */}
		<NavLink to="/wheelspin" activeStyle>
			Spin
		</NavLink>
		<NavLink to="/BingoBoard" activeStyle>
			Bingo
		</NavLink>
		</NavMenu>
	</Nav>
	</>
);
};

export default Navbar;
