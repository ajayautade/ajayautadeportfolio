"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import type { CartItem } from "@/lib/services-data";

// ============================================
// STATE
// ============================================

export interface ConsultationModalData {
  subject?: string;
  message?: string;
}

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  isCheckoutOpen: boolean;
  isConsultationOpen: boolean;
  consultationData: ConsultationModalData;
}

// ============================================
// ACTIONS
// ============================================

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string } // id
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_DRAWER" }
  | { type: "OPEN_DRAWER" }
  | { type: "CLOSE_DRAWER" }
  | { type: "OPEN_CHECKOUT" }
  | { type: "CLOSE_CHECKOUT" }
  | { type: "OPEN_CONSULTATION"; payload?: ConsultationModalData }
  | { type: "CLOSE_CONSULTATION" }
  | { type: "HYDRATE"; payload: CartItem[] };

// ============================================
// REDUCER
// ============================================

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      // Prevent duplicate items
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) return { ...state, isDrawerOpen: true };
      const newItems = [...state.items, action.payload];
      return { ...state, items: newItems, isDrawerOpen: true };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    }
    case "CLEAR_CART":
      return { ...state, items: [], isDrawerOpen: false, isCheckoutOpen: false };
    case "TOGGLE_DRAWER":
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    case "OPEN_DRAWER":
      return { ...state, isDrawerOpen: true };
    case "CLOSE_DRAWER":
      return { ...state, isDrawerOpen: false };
    case "OPEN_CHECKOUT":
      return { ...state, isCheckoutOpen: true, isDrawerOpen: false };
    case "CLOSE_CHECKOUT":
      return { ...state, isCheckoutOpen: false };
    case "OPEN_CONSULTATION":
      return {
        ...state,
        isConsultationOpen: true,
        consultationData: action.payload || {},
      };
    case "CLOSE_CONSULTATION":
      return {
        ...state,
        isConsultationOpen: false,
        consultationData: {},
      };
    case "HYDRATE":
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

// ============================================
// CONTEXT
// ============================================

interface CartContextValue {
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  toggleDrawer: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  openConsultation: (data?: ConsultationModalData) => void;
  closeConsultation: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

// ============================================
// PROVIDER
// ============================================

const STORAGE_KEY = "ajay-portfolio-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isDrawerOpen: false,
    isCheckoutOpen: false,
    isConsultationOpen: false,
    consultationData: {},
  });

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as CartItem[];
        dispatch({ type: "HYDRATE", payload: parsed });
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Ignore storage errors
    }
  }, [state.items]);

  const itemCount = state.items.length;

  const value: CartContextValue = {
    state,
    addItem: (item) => dispatch({ type: "ADD_ITEM", payload: item }),
    removeItem: (id) => dispatch({ type: "REMOVE_ITEM", payload: id }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    toggleDrawer: () => dispatch({ type: "TOGGLE_DRAWER" }),
    openDrawer: () => dispatch({ type: "OPEN_DRAWER" }),
    closeDrawer: () => dispatch({ type: "CLOSE_DRAWER" }),
    openCheckout: () => dispatch({ type: "OPEN_CHECKOUT" }),
    closeCheckout: () => dispatch({ type: "CLOSE_CHECKOUT" }),
    openConsultation: (data) =>
      dispatch({ type: "OPEN_CONSULTATION", payload: data }),
    closeConsultation: () => dispatch({ type: "CLOSE_CONSULTATION" }),
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ============================================
// HOOK
// ============================================

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
