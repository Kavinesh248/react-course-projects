import { getMenu } from "../../services/apiRestaurant";

export async function loader() {
  const menu = getMenu();
  return menu;
}
