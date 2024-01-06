// assets
import { IconPackage, IconUsers, IconArrowsTransferUp } from "@tabler/icons";

// constant
const icons = {
  IconPackage,
  IconUsers,
  IconArrowsTransferUp,
};

import * as routeUrl from "../../routes/routeUrl";

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: "pages",
  title: "",
  type: "group",
  children: [
    {
      id: "clientsManagement",
      title: routeUrl?.CLIENT.name,
      url: routeUrl?.CLIENT.url,
      type: "item",
      icon: icons.IconUsers,
      breadcrumbs: false,
    },
    {
      id: "productsManagement",
      title: routeUrl?.PRODUCTS.name,
      url: routeUrl?.PRODUCTS.url,
      type: "item",
      icon: icons.IconPackage,
      breadcrumbs: false,
    },
    {
      id: "transitionsManagement",
      title: routeUrl?.TRANSITIONS.name,
      url: routeUrl?.TRANSITIONS.url,
      type: "item",
      icon: icons.IconArrowsTransferUp,
      breadcrumbs: false,
    },
  ],
};

export default pages;
