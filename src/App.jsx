
// import { useState, useEffect } from "react";

// function App() {
//   const [currencies, setCurrencies] = useState([]);
//   const [from, setFrom] = useState("inr");
//   const [to, setTo] = useState("");
//   const [number, setNumber] = useState(0);
//   const [currencyValue, setCurrencyValue] = useState(0);

//   const api = () => {
//     fetch(
//       "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json"
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         // log each code and rate
//         // store as array of [code, rate]
//         setCurrencies(Object.entries(data.inr));
//       })
//       .catch((err) => console.error("Error fetching currencies:", err));
//   };

//   useEffect(() => {
//     api();
//   }, []);

//   // log whenever currencies state updates
//   useEffect(() => {
//     console.log("currencies are", currencies);
//   }, [currencies]);

//   return (
//     <div className="w-full h-screen bg-black text-white flex flex-col items-center gap-4">
//       <h1 className="font-bold text-xl">Currency Converter</h1>

//       <select
//         className="text-black"
//         onChange={(e) =>
//           setFrom(e.target.options[e.target.selectedIndex].text.toLowerCase())
//         }
//       >
// {currencies.map(([code, rate]) => (
//   <option key={code} value={rate}>
//     {code.toUpperCase()}
//   </option>
// ))}
//       </select>
//     </div>
//   );
// }

// export default App;








// -------------------------------------------------------------------------------
import { useState, useEffect, useCallback } from 'react'

function App() {

  const [currencies, setCurrencies] = useState([]);
  const [from, setFrom] = useState("inr");
  const [to, setTo] = useState("");
  const [number, setNumber] = useState(0);
  const [currencyValue, setCurrencyValue] = useState(0);

  const api = () => {
    fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json")
      .then(res => res.json())
      .then(data => {
        setCurrencies(Object.entries(data.inr));
      });
  };

  useEffect(() => {
    api();
  }, []);

  console.log("from is", from);
  console.log("to is", to);
  console.log("number is", number);

  const handleChange = useCallback(() => {
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`)
      .then(res => res.json())
      .then(data => {
        Object.entries(data[from]).forEach(([key, value]) => {
          if (key === to) {
            // setCurrencies(number * value);
            console.log("value is", value);
            console.log("key is", key);
          }
        });
      });

  }, [from, to, number]);

  useEffect(() => {
    handleChange();
  }, [handleChange]);

  return (
    <>
      <div className='w-full h-screen bg-black text-white flex flex-col items-center gap-4'>
        <div>
          <h1 className='font-bold text-xl color-blue'>Currency Convertor</h1>


          <div className='h-1/3 flex flex-row justify-center items-center border-2 border-white p-4 rounded-lg'>
            <div className='flex items-center flex-col'>
              <label>From</label>
              <input
                type="text"
                className='border-2 border-black ml-4 text-black'
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>

            <div className='ml-10 flex justify-center items-center flex-col'>
              <label>Currency Type</label>
              <select
                className='text-black'
                onChange={(e) => setFrom(e.target.options[e.target.selectedIndex].text.toLowerCase())}
              >
                {currencies.map(([code, rate]) => (
                  <option key={code} value={rate}>
                    {code.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='h-1/3 flex flex-row justify-center items-center border-2 border-white p-4 rounded-lg'>
            <div className='flex items-center flex-col'>
              <label>To</label>
              <input type="number" className='border-2 border-black ml-4' />
            </div>

            <div className='ml-10 flex justify-center items-center flex-col'>
              <label>Currency Type</label>
              <select className='text-black'
                onChange={(e) => setTo(e.target.options[e.target.selectedIndex].text.toLowerCase())}
              >
                {currencies.map(([code, rate]) => (
                  <option key={code} value={rate}>
                    {code.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App