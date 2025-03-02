import { useEffect, useState } from "react";

export function useSeatsPrice(travellers, store) {
  const [state, setState] = useState({ seats: 0, price: 0 });

  useEffect(() => {
    let seats = 0;
    let price = 0;
    for (const source in store) {
      if (store[source]) {
        travellers.forEach((traveller) => {
          if (store[source]?.[traveller?.fName]?.code) {
            seats += 1;
            price += store[source][traveller.fName].price;
          }
        });
      }
    }
    setState({ seats, price });
  }, [store]);

  return state;
}

export function useSelectedSeatCodes(travellers, store) {
  const [state, setState] = useState([]);

  useEffect(() => {
    const seats = [];
    for (const source in store) {
      if (store[source]) {
        travellers.forEach((traveller) => {
          if (store[source]?.[traveller?.fName]) {
            seats.push(store[source]?.[traveller.fName]);
          }
        });
      }
    }
    setState(seats);
  }, [store]);

  return state;
}

export function useBaggagePrice(travellers, store) {
  const [state, setState] = useState({ baggages: 0, price: 0 });
  useEffect(() => {
    let baggages = 0;
    let price = 0;
    for (const source in store) {
      if (store[source]) {
        travellers.forEach((traveller) => {
          if (store[source]?.[traveller?.fName]) {
            baggages += store[source][traveller.fName].length;
            price += store[source][traveller.fName].reduce(
              (acc, item) => acc + item.price,
              0,
            );
          }
        });
      }
    }

    setState({ baggages, price });
  }, [store]);

  return state;
}

export function useMealsPrice(travellers, store) {
  const [state, setState] = useState({ meals: 0, price: 0 });
  useEffect(() => {
    let meals = 0;
    let price = 0;
    for (const source in store) {
      if (store[source]) {
        travellers.forEach((traveller) => {
          if (store[source]?.[traveller.fName]) {
            meals += store[source][traveller.fName].length;
            price += store[source][traveller.fName].reduce(
              (acc, item) => acc + item.price,
              0,
            );
          }
        });
      }
    }
    setState({ meals, price });
  }, [store]);

  return state;
}

export function getCurrency(seat) {
  const [state, setState] = useState("");
  useEffect(() => {
    const currency = seat?.currency || "";
    setState(currency);
  }, [seat]);
  return state;
}
