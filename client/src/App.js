import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme } from "./utils/Themes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ShopListing from "./pages/ShopListing";
import Favourite from "./pages/Favourite";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";


const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

function App() {
  const [openAuth, setOpenAuth] = useState(false);
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Container>
          <Navbar setOpenAuth = {setOpenAuth}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element = {<ShopListing/>}/>
            <Route path="/favourite" element = {<Favourite/>}/>
            <Route path="/cart" element = {<Cart/>}/>
            <Route path="/shop?:id" element = {<ProductDetails/>}/>
          </Routes>
          {openAuth && <Auth openAuth = {openAuth} setOpenAuth = {setOpenAuth}/>}
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
