// assets
import { IconShoppingCart, IconUserPlus } from "@tabler/icons";

// constant
const icons = {
  IconShoppingCart,
  IconUserPlus,
};

import * as routeUrl from "../../routes/routeUrl";

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: "pages",
  title: "",
  type: "group",
  children: [
    {
      id: "productsManagement",
      title: routeUrl?.PRODUCTS.name,
      url: routeUrl?.PRODUCTS.url,
      type: "item",
      icon: icons.IconShoppingCart,
      breadcrumbs: false,
    },
    {
      id: "clientsManagement",
      title: routeUrl?.CLIENT.name,
      url: routeUrl?.CLIENT.url,
      type: "item",
      icon: icons.IconUserPlus,
      breadcrumbs: false,
    },
  ],
};

export default pages;
