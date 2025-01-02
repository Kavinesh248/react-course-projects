import { useContext, useReducer } from "react";
import { useEffect } from "react";
import { createContext } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  // actions: 'loading', 'cities/loaded', 'city/loaded', 'city/created', 'city/deleted', 'rejected';

  switch (action.type) {
    case "loaded":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    case "rejected":
      return {
        ...state,
        error: action.payload,
      };

    default:
      throw new Error("Action Unknown");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function setDispatch(type = "loaded", payload = "") {
    return dispatch({ type: type, payload: payload });
  }

  useEffect(function () {
    async function fetchCities() {
      setDispatch();

      try {
        const res = await fetch(`${BASE_URL}/cities`);

        if (!res.ok) throw new Error("Cities not found!");

        const data = await res.json();

        setDispatch("cities/loaded", data);
      } catch (err) {
        setDispatch("rejected", err.message);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    setDispatch();

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) {
        throw new Error(`City with ID ${id} not found.`);
      }

      const data = await res.json();

      setDispatch("city/loaded", data);
    } catch (err) {
      setDispatch("rejected", err.message);
    }
  }

  async function createCity(newCity) {
    setDispatch();

    try {
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      setDispatch("city/created", data);
    } catch {
      setDispatch("rejected", "There was an error uplaoding data...");
    }
  }

  async function deleteCity(id) {
    setDispatch();

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      setDispatch("city/deleted", id);
    } catch {
      setDispatch("rejected", "There was an error deleting data...");
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        error,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used by the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
