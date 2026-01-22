import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductCard from "../components/cards/ProductCard";
import { getFavourite } from "../api";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  margin: auto;
  height: 100%;
  width: 85%;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 12px;
  }
  background: ${({ theme }) => theme.bg};
`;

const Section = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Img = styled.img`
  width: 100%;
  height: 800px;
  object-fit: cover;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  display: flex;
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  align-items: center;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  @media (max-width: 750px) {
    gap: 14px;
  }
`;

const Favourite = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    const token = localStorage.getItem("jwellery-app-token");
    await getFavourite(token).then((res) => {
      setProducts(res.data);
      setLoading(false);
      setReload(!reload);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container>
      <Section>
        <Title center>Your favourites</Title>
        <CardWrapper>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {products.length === 0 ? (
                <>No Products</>
              ) : (
                <CardWrapper>
                  {products.map((product) => (
                    <ProductCard product={product} />
                  ))}
                </CardWrapper>
              )}
            </>
          )}
        </CardWrapper>
      </Section>
    </Container>
  );
};

export default Favourite;
