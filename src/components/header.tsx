import Image from 'next/future/image'
import logoImg from '../assets/logo.svg'
import {useShoppingCart} from 'use-shopping-cart'
import {Handbag} from 'phosphor-react'
import { HeaderContainer } from '../styles/components/header'
import Link from 'next/link'
import {Cart} from '../components/cart'

export function Header() {
  const { handleCartClick, cartCount } = useShoppingCart();

  return (
    <>
      <HeaderContainer>
        <Link href={"/"}>
          <Image src={logoImg} alt="" />
        </Link>
        <div>
          <button onClick={handleCartClick}>
            <Handbag size={24} weight="bold" />
          </button>
          {cartCount > 1 ? <CartCount>{cartCount}</CartCount> : ""}
        </div>
      </HeaderContainer>
    </>
  );
}
 /*
 export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',

  button: {
    width: 48,
    height: 48,
    
    border: 0,
    borderRadius: 8,

    backgroundColor: '$gray800',
    color: '$gray300'
  }
})
 
export const CartCount = styled("span", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",

  background: "#00875F",
  border: "2px solid #121214",
  borderRadius: "1000px",
  width: "24px",
  height: "24px",

  flex: "none",
  order: 1,
  flexGrow: 0,
  //zIndex: 1,

  marginTop: '-50px',
  marginLeft: '30px'
});*/
