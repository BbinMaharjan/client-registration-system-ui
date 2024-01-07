// assets
import { IconBrandProducthunt, IconUserCircle } from "@tabler/icons";

// constant
const icons = {
  IconBrandProducthunt,
  IconUserCircle,
};

import * as routeUrl from "../../routes/routeUrl";

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: "pages",
  title: "",
  type: "group",
  children: [
    // {
    //   id: "productsManagement",
    //   title: routeUrl?.PRODUCTS.name,
    //   url: routeUrl?.PRODUCTS.url,
    //   type: "item",
    //   icon: icons.IconBrandProducthunt,
    //   breadcrumbs: false,
    // },
    {
      id: "clientsManagement",
      title: routeUrl?.CLIENT.name,
      url: routeUrl?.CLIENT.url,
      type: "item",
      icon: icons.IconUserCircle,
      breadcrumbs: false,
    },
  ],
};

export default pages;
