export default function Datepicker() {
  const [show, setShow] = useState(false);
  function onKeyDown({ keyCode }) {
    if (keyCode === 27) setShow(false);
  }
  return (
    <div className="mb-5 w-64">
      <label for="datepicker" className="font-bold mb-1 text-gray-700 block">Select Date</label>
      <div className="relative">
        <input type="hidden" name="date" x-ref="date" />
        <input
          type="text"
          readonly
          x-model="datepickerValue"
          onClick={() => setShow(!show)}
          onKeyDown={onKeyDown}
          className="w-full pl-4 pr-10 py-3 leading-none rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
          placeholder="Select date"
        />

        <div className="absolute top-0 right-0 px-3 py-2">
          <svg
            className="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        <div
          className="bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0"
          style="width: 17rem"
          x-show.transition="showDatepicker"
          @click.away="showDatepicker = false"
        >
          <div className="flex justify-between items-center mb-2">
            <div>
              <span
                x-text="MONTH_NAMES[month]"
                className="text-lg font-bold text-gray-800"
              ></span>
              <span
                x-text="year"
                className="ml-1 text-lg text-gray-600 font-normal"
              ></span>
            </div>
            <div>
              <button
                type="button"
                className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                :className="{'cursor-not-allowed opacity-25': month == 0 }"
                :disabled="month == 0 ? true : false"
                @click="month--; getNoOfDays()"
              >
                <svg
                  className="h-6 w-6 text-gray-500 inline-flex"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                :className="{'cursor-not-allowed opacity-25': month == 11 }"
                :disabled="month == 11 ? true : false"
                @click="month++; getNoOfDays()"
              >
                <svg
                  className="h-6 w-6 text-gray-500 inline-flex"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


    <div className="flex flex-wrap mb-3 -mx-1">
                <template x-for="(day, index) in DAYS" :key="index">
                  <div style="width: 14.26%" className="px-1">
                    <div
                      x-text="day"
                      className="text-gray-800 font-medium text-center text-xs"
                    ></div>
                  </div>
                </template>
              </div>

              <div className="flex flex-wrap -mx-1">
                <template x-for="blankday in blankdays">
                  <div
                    style="width: 14.28%"
                    className="text-center border p-1 border-transparent text-sm"
                  ></div>
                </template>
                <template
                  x-for="(date, dateIndex) in no_of_days"
                  :key="dateIndex"
                >
                  <div style="width: 14.28%" className="px-1 mb-1">
                    <div
                      @click="getDateValue(date)"
                      x-text="date"
                      className="cursor-pointer text-center text-sm leading-none rounded-full leading-loose transition ease-in-out duration-100"
                      :className="{'bg-blue-500 text-white': isToday(date) == true, 'text-gray-700 hover:bg-blue-200': isToday(date) == false }"
                    ></div>
                  </div>
                </template>