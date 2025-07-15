import React from "react";

// material-ui
import { Typography } from "@mui/material";

import NavGroup from "./NavGroup";

// ==============================|| MENULIST ||============================== //

import {
  FaFileInvoiceDollar,
  FaHome,
  FaUser,
  FaBoxOpen,
  FaClipboardList,
  FaTags,
  FaUserShield,
  FaLanguage,
  FaFileAlt,
  FaLock,
  FaSignInAlt,
  FaUserPlus,
  FaTools,
  FaIcons,
  FaRegLifeRing,
  FaQuestion,
  FaBullhorn,
} from "react-icons/fa";
import { GiBlockHouse } from "react-icons/gi";
import { ImBook } from "react-icons/im";
import { TbShoppingBagPlus } from "react-icons/tb";
import { BsShop } from "react-icons/bs";

const icons = {
  PurchaseOrderIcon: TbShoppingBagPlus,
  VendorIcon: BsShop,
  BannersIcon: FaBullhorn,
  NavigationOutlinedIcon: FaHome,
  HomeOutlinedIcon: FaHome,
  ChromeReaderModeOutlinedIcon: FaFileAlt,
  HelpOutlineOutlinedIcon: FaQuestion,
  SecurityOutlinedIcon: FaLock,
  AccountTreeOutlinedIcon: FaTools,
  BlockOutlinedIcon: GiBlockHouse,
  AppsOutlinedIcon: FaIcons,
  ContactSupportOutlinedIcon: FaRegLifeRing,
  UsersIcon: FaUser,
  BrandsIcon: FaBoxOpen,
  CategoryIcon: FaClipboardList,
  ProductsIcon: FaBoxOpen,
  OrdersIcon: FaClipboardList,
  PaymentsIcon: FaFileInvoiceDollar,
  OffersIcon: FaTags,
  NotificationsIcon: ImBook,
  RolesIcon: FaUserShield,
  LanguagesIcon: FaLanguage,
  LoginIcon: FaSignInAlt,
  RegisterIcon: FaUserPlus,
};

const MenuList = ({ onMenuItemClick }) => {
  const items = [
    {
      id: "navigation",
      // title: 'Admin Panel',
      // caption: 'Dashboard',
      type: "group",
      icon: icons["NavigationOutlinedIcon"],
      children: [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          icon: icons["HomeOutlinedIcon"],
          url: "/",
        },
        {
          id: "category",
          title: "Category",
          type: "item",
          icon: icons["CategoryIcon"],
          url: "/category",
        },
        {
          id: "products",
          title: "Products",
          type: "item",
          icon: icons["ProductsIcon"],
          url: "/products",
        },
      ],
    },
  ];

  const navItems = items.map((item) => {
    switch (item.type) {
      case "group":
        return (
          <NavGroup
            key={item.id}
            item={item}
            onMenuItemClick={onMenuItemClick}
          />
        );
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return navItems;
};

export default MenuList;
