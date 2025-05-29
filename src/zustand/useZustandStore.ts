import {create} from 'zustand';
import {
  cartType,
  CreateStoreTypes,
  orderType,
  productType,
  user,
  userDetailType,
} from '../utils/common/types';
import {persist, createJSONStorage} from 'zustand/middleware';
import storage from '../storage/storage';
import {products} from '../data/Products';

const initialUserData: user = {
  isLogin: false,
  details: {
    username: '',
    email: '',
    password: '',
    uid: '',
    birthDate: '',
    photo: 'https://robohash.org/mail@ashallendesign.co.uk',
  },
};
const initialProductList = products;

const useZustandStore = create<CreateStoreTypes>()(
  persist(
    (set, get) => {
      const setLoading = (flag: boolean) => {
        set({
          ...get(),
          isLoading: flag,
        });
      };
      const setUserLogin = (data: userDetailType) => {
        const newState = {
          user: {
            isLogin: true,
            details: {
              ...data,
            },
          },
        };
        set(newState);
      };
      const setUserLoginOut = () => {
        const newState = {
          user: {
            isLogin: false,
            details: {
              username: '',
              email: '',
              password: '',
              uid: '',
              birthDate: '',
              photo: 'https://robohash.org/mail@ashallendesign.co.uk',
            },
          },
        };
        set(newState);
      };
      const setSingleProduct = (id: string) => {
        const singleProduct = get().products.find(item => item.id === id);

        set({
          ...get(),
          singleProduct: singleProduct,
        });
      };
      const filterProducts = (hint: string) => {
        let filterProducts;
        if (hint === '') {
          filterProducts = products;
        } else {
          filterProducts = products.filter((item: productType) =>
            item.name.toLocaleLowerCase().includes(hint.toLocaleLowerCase()),
          );
          // if (filterProducts.length === 0) {
          //   filterProducts = [];
          // }
        }
        set({
          ...get(),
          products: filterProducts,
        });
      };
      const setUserFavourites = (data: productType[]) => {
        set({
          ...get(),
          Favourites: data,
        });
      };
      const setUserCart = (data: cartType[]) => {
        set({
          ...get(),
          Cart: data,
        });
      };
      const setUserOrders = (data: orderType[]) => {
        set({
          ...get(),
          Orders: data,
        });
      };
      const cartActions = (id: string, actions: string) => {
        const newCart = get().Cart.map((element: cartType) => {
          if (element.id === id) {
            if (actions === 'PLUS')
              return {...element, quantity: element.quantity + 1};
            else {
              if (element.quantity > 1) {
                return {...element, quantity: element.quantity - 1};
              } else return element;
            }
          } else return element;
        });
        set({
          ...get(),
          Cart: newCart,
        });
      };
      const DeleteProductCart = (id: any) => {
        const updatedCart = get().Cart.filter(ele => ele.id !== id);
        set({
          ...get(),
          Cart: updatedCart,
        });
      };
      return {
        isLoading: false,
        user: initialUserData,
        products: initialProductList,
        Favourites: [],
        Cart: [],
        Orders: [],
        singleProduct: null,
        setLoading,
        setUserLogin,
        setUserLoginOut,
        setSingleProduct,
        filterProducts,
        setUserFavourites,
        setUserCart,
        DeleteProductCart,
        cartActions,
        setUserOrders,
      };
    },
    {
      name: 'Nector',
      storage: createJSONStorage(() => storage),
      partialize: state => ({user: state.user}),
    },
  ),
);

export default useZustandStore;
