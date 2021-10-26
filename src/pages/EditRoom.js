import { getAuth } from "@firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API_URL } from "..";
import { editBidRoom } from "../api/apiBidding";
import RoomForm from "../components/RoomForm";

export default function EditRoom() {
  const form = useRef();
  const { id } = useParams();
  const [downForm, setForm] = useState();
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const token = await getAuth().currentUser.getIdToken();
      fetch(API_URL + "/api/room/get/" + id, {
        headers: {
          "X-Access-Token": token,
        },
      }).then(async (rsp) => {
        rsp = await rsp.json();
        form.current.price = rsp.data.price;
        setForm(rsp.data);
      });
    }
    fetchData();
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { price, startTime, endTime, product, entryFee, stepAmount } =
      form.current;
    if (price && startTime && endTime && product > 0 && entryFee) {
      // const tzoffset = new Date().getTimezoneOffset() * 60000;
      const body = {
        roomid: id,
        startbidamt: parseFloat(price),
        // starttime: Date.parse(startTime) + tzoffset,
        // endtime: Date.parse(endTime) + tzoffset,
        starttime: Date.parse(startTime),
        endtime: Date.parse(endTime),
        productid: parseInt(product),
        entryfee: parseInt(entryFee) * 100,
        stepamt: stepAmount,
      };
      await editBidRoom(body);
      history.push("/rooms");
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
