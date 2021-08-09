import Sidebar from "./Sidebar";
import Table from "./Table";
import { Switch, Route } from "react-router-dom";
import Biddings from "../pages/Biddings";
import CreateBidding from "../pages/CreateBidding";

export default function Dashboard() {
  return (
    <div className="flex flex-wrap bg-gray-100 w-full h-screen">
      <Sidebar />

      <div className="w-9/12">
        <div className="p-4 text-gray-500">
          <Switch>
            <Route path="/biddings/new">
              <CreateBidding />
            </Route>
            <Route path="/biddings">
              <Biddings />
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
