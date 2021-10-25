import Sidebar from "./Sidebar";
import Home from "../pages/Home";
import { Switch, Route } from "react-router-dom";
import Rooms from "../pages/Rooms";
import CreateRoom from "../pages/CreateRoom";
import Products from "../pages/Products";
import EditProduct from "../pages/EditProduct";
import CreateProduct from "../pages/CreateProducts";
import EditRoom from "../pages/EditRoom";
import BiddingHistory from "../pages/BiddingHistory";

export default function Dashboard() {
  return (
    <div className="flex flex-wrap bg-gray-100 w-full h-screen">
      <Sidebar />

      <div className="w-9/12 h-full">
        <div className="p-4 text-gray-500 h-full overflow-y-scroll">
          <Switch>
            <Route path="/products/edit/:id">
              <EditProduct />
            </Route>
            <Route path="/products/new">
              <CreateProduct />
            </Route>
            <Route path="/products">
              <Products />
            </Route>
            <Route path="/rooms/new">
              <CreateRoom />
            </Route>
            <Route path="/rooms/:id">
              <EditRoom />
            </Route>
            <Route path="/rooms">
              <Rooms />
            </Route>
            <Route path="/history">
              <BiddingHistory />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
