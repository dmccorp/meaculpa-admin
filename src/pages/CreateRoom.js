import { useRef } from "react";
import RoomForm from "../components/RoomForm";
import { createBidRoom } from "../api/apiBidding";
import { useHistory } from "react-router-dom";

export default function CreateRoom() {
  const form = useRef();
  const history = useHistory();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { price, startTime, endTime, product, entryFee, stepAmount } =
      form.current;
    if (price && startTime && endTime && product > 0 && entryFee) {
      const body = {
        startbidamt: parseFloat(price),
        starttime: Date.parse(startTime),
        endtime: Date.parse(endTime),
        productid: parseInt(product),
        entryfee: parseInt(entryFee) * 100,
        stepamt: stepAmount,
      };
      createBidRoom(body).then((res) => {
        if (res.ok) history.push("/rooms");
        res
          .text()
          .then((txt) => {
            return JSON.parse(txt).msg;
          })
          .then((txt) => {
            alert(txt);
          });
      });
    }
  };

  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <form onSubmit={handleFormSubmit}>
        <div className="shadow sm:rounded-md sm:overflow-hidden bg-white">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate px-5 pt-5">
            Create room
          </h2>
          <RoomForm form={form} />
        </div>
      </form>
    </div>
  );
}
