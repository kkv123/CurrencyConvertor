
import { useState, useEffect, useCallback } from 'react'

function App() {

  const [currencies, setCurrencies] = useState([]);
  const [from, setFrom] = useState("1inch");
  const [to, setTo] = useState("1inch");
  const [number, setNumber] = useState(0);
  const [currencyValue, setCurrencyValue] = useState(0);
  const [swap, setSwap] = useState(false);

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

  const handleChange = useCallback(() => {
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`)
      .then(res => res.json())
      .then(data => {
        Object.entries(data[from]).forEach(([key, value]) => {
          if (key === to) {
            setCurrencyValue(number * value);
          }
        });
      });
      console.log(number, from, to,swapValue);

  }, [from, to, number]);

  useEffect(() => {
    handleChange();
  }, [handleChange]);

  const swapValue = () => {
    const temp = number;
    console.log(currencyValue,number);
    setNumber(currencyValue);
    setCurrencyValue(temp);
    console.log(currencyValue,number);
    setSwap(!swap);

  };

  return (
    <>
      <div className='w-full h-screen bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white flex flex-col items-center gap-4'>
        <div className='flex bg-gradient-to-b from-gray-900 to-gray-600 justify-center items-center flex-col gap-1 mt-20 border-2 border-gray-300 p-6 rounded-lg  text-black-900 font-bold text-lg'>
          <h1 className='font-bold text-xl color-blue'>Currency Convertor</h1>


          <div className='h-1/3 flex flex-row justify-center items-center border-2 border-white p-4 rounded-lg'>
            <div className='flex items-center flex-col'>
              <label>From</label>
              <input
                type="number"
                pattern="[0-9]*"
                inputMode="numeric"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className='border-2 border-black ml-4 text-black'
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

          <button onClick={swapValue}
            className='border-2 border-white rounded-xl p-1 -m-1 bg-gray-700 hover:bg-gray-600'
          >Swap</button>

          <div className='h-1/3 flex flex-row justify-center items-center border-2 border-white p-4 rounded-lg'>
            <div className='flex items-center flex-col'>
              <label>To</label>
              <input
                type="text"
                readOnly
                className="border-2 border-black ml-4 text-gray-900 font-bold text-lg"
                value={currencyValue}
              />
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