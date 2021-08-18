import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "..";
import { editBidRoom } from "../api/apiBidding";
import RoomForm from "../components/RoomForm";

export default function EditRoom() {
  const form = useRef();
  const { id } = useParams();
  const [downForm, setForm] = useState();

  useEffect(() => {
    fetch(API_URL + "/api/room/get/" + id).then(async (rsp) => {
      rsp = await rsp.json();
      form.current.price = rsp.data.price;
      setForm(rsp.data);
    });
  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { price, startTime, endTime, product, entryFee, stepAmount } =
      form.current;
    if (price && startTime && endTime && product > 0 && entryFee) {
      const body = {
        roomid: id,
        startbidamt: parseFloat(price),
        starttime: Date.parse(startTime),
        endtime: Date.parse(endTime),
        productid: parseInt(product),
        entryfee: parseInt(entryFee),
        stepamt: stepAmount,
      };
      editBidRoom(body);
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <form onSubmit={handleFormSubmit}>
        <div className="shadow sm:rounded-md sm:overflow-hidden bg-white">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate px-5 pt-5">
            Edit room
          </h2>
          <RoomForm form={form} update={downForm} />
        </div>
      </form>
    </div>
  );
}
