// assets
import { IconDashboard, IconHome } from "@tabler/icons";
// constant
const icons = { IconDashboard, IconHome };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: "home",
  title: "",
  type: "group",
  children: [
    {
      id: "home",
      title: "Home",
      type: "item",
      url: "/",
      icon: icons.IconHome,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
