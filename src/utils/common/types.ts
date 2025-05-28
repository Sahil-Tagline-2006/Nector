type userDetailType = {
  username: string;
  email: string;
  password: string;
  uid: string;
};

type user = {
  isLogin: boolean;
  details: userDetailType;
};

type productType = {
  id: string;
  name: string;
  image: any;
  price: string;
  pcs: string;
};
type orderType = {
  orderAt:string,
  products:cartType[],
  totalPrice:number | string,
  totalQuantity:number,
  id:string
};
type cartType =productType & {quantity:number}

type CreateStoreTypes = {
  isLoading:boolean,
  user: user;
  products: productType[];
  singleProduct: productType | null;
  Favourites:productType[],
  Cart:cartType[],
  Orders:orderType[],
  setLoading:(flag:boolean)=>void;
  setUserLogin: (data: userDetailType) => void;
  setUserLoginOut: () => void;
  setSingleProduct: (id: string) => void;
  filterProducts:(hint:string)=>void;
  setUserFavourites:(data:productType[])=>void;
  setUserCart:(data:cartType[])=>void;
  DeleteProductCart:(id:any)=>void;
  setUserOrders:(data:orderType[])=>void;
  cartActions:(id:string,actions:string)=>void;
};

export type {CreateStoreTypes, user, userDetailType,productType,cartType,orderType};
