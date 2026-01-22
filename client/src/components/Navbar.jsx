import { useState } from "react";
import styled from "styled-components";
import LogoImg from "../utils/Images/Logo.png";
import { NavLink as RouterNavLink } from "react-router-dom";
import Button from "./Button";
import {
  FavoriteBorder,
  MenuRounded,
  SearchRounded,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userSlice";

const Nav = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
`;

const NavbarContainer = styled.div`
  width: 90%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;
const NavLogo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 6px;
  font-weight: 500;
  font-size: 18px;
  text-decoration: none;
  color: inherit;
  @media (min-width: 768px) and (max-width: 1400px) {
    width: 20%;
  }
`;

const Logo = styled.img`
  height: 34px;
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ButtonContainer = styled.div`
  // width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 28px;
  align-items: center;
  padding: 0 6px;
  color: ${({ theme }) => theme.primary};
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MobileIcon = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    // gap: 28px;
  }
`;

const Mobileicons = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
`;

const MobileMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  padding: 0 6px;
  list-style: none;
  width: 80%;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.card_light + 99};
  position: absolute;
  top: 80px;
  right: 0;
  transition: all 0.6s ease-in-out;
  transform: ${({ isopen }) =>
    isopen ? "translateY(0)" : "translateY(-100%)"};
  opacity: ${({ isopen }) => (isopen ? "100%" : "0")};
  z-index: ${({ isopen }) => (isopen ? "1000" : "-1000")};
`;

const NavLink = styled(RouterNavLink)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 1s slide-in;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  &.active {
    color: ${({ theme }) => theme.primary};
    border-bottom: 1.8px solid ${({ theme }) => theme.primary};
  }
`;

const TextButton = styled.div`
  text-align: end;
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  font-size: 600;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Navbar = ({ openAuth, setOpenAuth, currentUser }) => {
  const [isopen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  return (
    <Nav>
      <NavbarContainer>
        <MobileIcon onClick={() => setIsOpen(!isopen)}>
          <MenuRounded style={{ color: "inherit" }} />
        </MobileIcon>

        <NavLogo>
          <Logo src={LogoImg} />
        </NavLogo>

        <NavItems>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/Shop">Shop</NavLink>
          <NavLink to="/New_Arrivals">New Arrivals</NavLink>
          <NavLink to="/Orders">Orders</NavLink>
          <NavLink to="/Contact">Contact</NavLink>
        </NavItems>

        {isopen && (
          <MobileMenu isopen={isopen}>
            <NavLink to="/" onClick={() => setIsOpen(!isopen)}>
              Home
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isopen)} to="/Shop">
              Shop
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isopen)} to="/New_Arrivals">
              New Arrivals
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isopen)} to="/Orders">
              Orders
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isopen)} to="/Contact">
              Contact
            </NavLink>
            {currentUser ? (
              <Button text="Logout" small onClick={() => dispatch(logout())} />
            ) : (
              <div
                style={{
                  flex: "1",
                  display: "flex",
                  gap: "12px",
                }}
              >
                <Button
                  text="Sign Up"
                  outlined
                  small
                  onClick={() => setOpenAuth(!openAuth)}
                />
                <Button
                  text="Sign In"
                  small
                  onClick={() => setOpenAuth(!openAuth)}
                />
              </div>
            )}
          </MobileMenu>
        )}

        <Mobileicons>
          <NavLink to="/search">
            <SearchRounded sx={{ color: "inherit", fontSize: "30px" }} />
          </NavLink>

          {currentUser ? (
            <>
              <NavLink to="/favourite">
                <FavoriteBorder sx={{ color: "inherit", fontSize: "28px" }} />
              </NavLink>
              <NavLink to="/cart">
                <ShoppingCartOutlined
                  sx={{ color: "inherit", fontSize: "28px" }}
                />
              </NavLink>
              <Avatar
                src={currentUser?.img}
                sx={{
                  color: "inherit",
                  fontSize: "28px",
                }}
              >
                {currentUser?.name[0]}
              </Avatar>
            </>
          ) : (
            <Button
              text="SignIn"
              small
              onClick={() => setOpenAuth(!openAuth)}
            />
          )}
        </Mobileicons>

        <ButtonContainer>
          {/* <NavLink to="/search">
            <SearchRounded sx={{ color: "inherit", fontSize: "30px" }} />
          </NavLink> */}

          {currentUser ? (
            <>
              <NavLink to="/favourite">
                <FavoriteBorder sx={{ color: "inherit", fontSize: "28px" }} />
              </NavLink>
              <NavLink to="/cart">
                <ShoppingCartOutlined
                  sx={{ color: "inherit", fontSize: "28px" }}
                />
              </NavLink>
              <Avatar
                src={currentUser?.img}
                sx={{
                  color: "inherit",
                  fontSize: "28px",
                }}
              >
                {currentUser?.name[0]}
              </Avatar>
              <TextButton onClick={() => dispatch(logout())}>Logout</TextButton>
            </>
          ) : (
            <Button
              text="SignIn"
              small
              onClick={() => setOpenAuth(!openAuth)}
            />
          )}
        </ButtonContainer>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
