import React from "react";
import styled from "styled-components";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
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
  align-items: center;
  font-size: 22px;
  gap: 28px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  display: flex;
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
  padding: 12px;
  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 750px) {
    flex: 1.2;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 750px) {
    flex: 0.8;
  }
`;

const Table = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 30px;
  ${({ head }) => head && `margin-bottom: 22px`}
`;

const TableItem = styled.div`
  ${({ flex }) => flex && `flex: 1; `}
  ${({ bold }) =>
    bold &&
    `font-weight: 600; 
  font-size: 18px;`}
`;

const Counter = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.text_secondary + 40};
  border-radius: 8px;
  padding: 4px 12px;
`;

const Product = styled.div`
  display: flex;
  gap: 16px;
`;

const Img = styled.img`
  height: 80px;
`;
const Details = styled.div``;
const ProTitle = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  font-weight: 500;
`;

const ProDesc = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProSize = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const Subtotal = styled.div`
  font-size: 22px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
`;

const Delivery = styled.div`
  font-size: 18px;
  font-weight: 500;
  display: flex;
  gap: 6px;
  flex-direction: column;
`;

const Cart = () => {
  return (
    <Container>
      <Section>
        <Title center>Your Shopping Cart</Title>
        <Wrapper>
          <Left>
            <Table>
              <TableItem bold flex>
                Product
              </TableItem>
              <TableItem bold>Price</TableItem>
              <TableItem bold>Quantity</TableItem>
              <TableItem bold>Subtotal</TableItem>
              <TableItem></TableItem>
            </Table>
            <Table>
              <TableItem flex>
                <Product>
                  <Img src="https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/28219632/2024/3/12/2f53aaab-40e1-4c5b-8148-6ad150e5f4341710256687634CampusSutraMenClassicOpaqueCheckedCasualShirt2.jpg" />
                  <Details>
                    <ProTitle>Title</ProTitle>
                    <ProDesc>Desc</ProDesc>
                    <ProSize>12</ProSize>
                  </Details>
                </Product>
              </TableItem>
              <TableItem>$120</TableItem>
              <TableItem>
                <Counter>
                  <div
                    style={{
                      cursor: "pointer",
                      flex: 1,
                    }}
                  >
                    -
                  </div>
                  2
                  <div
                    style={{
                      cursor: "pointer",
                      flex: 1,
                    }}
                  >
                    +
                  </div>
                </Counter>
              </TableItem>
              <TableItem>$240</TableItem>
            </Table>
          </Left>
          <Right>
            <Subtotal></Subtotal>
            <Delivery>
              Delivery Details:
              <div>
                <div style={{ display: "flex", gap: "6px" }}>
                  <TextInput small placeholder="First Name" />
                  <TextInput small placeholder="Last Name" />
                </div>
                <TextInput small placeholder="Email Address" />
                <TextInput small placeholder="Phone no." />
                <TextInput
                  small
                  textArea
                  rows="5"
                  placeholder="Complete Address (Address, State, Country, Pincode)"
                />
              </div>
            </Delivery>
            <Delivery>
              Payment Details:
              <div>
                <TextInput small placeholder="Card Number" />
                <div style={{ display: "flex", gap: "6px" }}>
                  <TextInput small placeholder="Expiry Date" />
                  <TextInput small placeholder="CVV" />
                </div>
                <TextInput small placeholder="Card Holder Name" />
              </div>
            </Delivery>
            <Button text = "Place Order"/>
          </Right>
        </Wrapper>
      </Section>
    </Container>
  );
};

export default Cart;
