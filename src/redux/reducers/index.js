const initialState = {
  city: {},
  name: "Scilla",
  country: { country: "IT" },
  weather: {},
  temp: {},
  wind: {},
  search: {},
  next5Days: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CITY":
      return (state = {
        ...state,
        name: action.payload,
      });

    case "COUNTRY":
      return (state = {
        ...state,
        country: action.payload,
      });

    case "LON":
      return (state = {
        ...state,
        lon: action.payload,
      });

    case "LAT":
      return (state = {
        ...state,
        lat: action.payload,
      });

    case "WEATHER":
      return (state = {
        ...state,
        weather: action.payload,
      });

    case "TEMP":
      return (state = {
        ...state,
        temp: action.payload,
      });

    case "WIND":
      return (state = {
        ...state,
        wind: action.payload,
      });

    case "SEARCH":
      return (state = {
        ...state,
        search: action.payload,
      });

    case "NEXT_5_DAYS":
      return { ...state, next5Days: action.payload };

    /* case "CURRENT":
      return (state = {
        ...state.city,
        city: action.payload,
      }); */

    /* 
    case "SEARCH":
      return (state = {
        state,
        search: action.payload,
      }); */

    /* case "ADD_TO_FAV":
      return (state = {
        ...state,
        favourites: [...state.favourites, action.payload.city],
      }); */
    default:
      return state;
  }
};

export default appReducer;
