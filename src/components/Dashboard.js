import Sidebar from "./Sidebar";
import Table from "./Table";
import { Switch, Route } from "react-router-dom";
import Rooms from "../pages/Rooms";
import CreateRoom from "../pages/CreateRoom";
import Products from "../pages/Products";
import EditProduct from "../pages/EditProduct";
import CreateProduct from "../pages/CreateProducts";
import EditRoom from "../pages/EditRoom";

export default function Dashboard() {
  return (
    <div className="flex flex-wrap bg-gray-100 w-full h-screen">
      <Sidebar />

      <div className="w-9/12">
        <div className="p-4 text-gray-500">
          <Switch>
            <Route path="/product/edit/:id">
              <EditProduct />
            </Route>
            <Route path="/product/new">
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
            <Route path="/users">users</Route>
            <Route path="/" exact>
              <Table />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
