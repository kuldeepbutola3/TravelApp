export const flightReducer = (state, action) => {
  switch (action.type) {
    case "ADD_SEAT":
      if (state.seats?.[state.source]) {
        if (state.seats?.[state.source]?.[state.traveller]) {
          return {
            ...state,
            seats: {
              ...state.seats,
              [state.source]: {
                ...state.seats[state.source],
                [state.traveller]: action.payload,
              },
            },
          };
        }
        return {
          ...state,
          seats: {
            ...state.seats,
            [state.source]: {
              ...state.seats[state.source],
              [state.traveller]: action.payload,
            },
          },
        };
      }
      return {
        ...state,
        seats: {
          ...state.seats,
          [state.source]: {
            [state.traveller]: action.payload,
          },
        },
      };

    case "REMOVE_SEAT":
      return {
        ...state,
        seats: {
          ...state.seats,
          [state.source]: {
            ...state.seats[state.source],
            [state.traveller]: {},
          },
        },
      };



    case "ADD_MEAL":
      if (state.meals?.[state.source]) {
        if (state.meals?.[state.source]?.[state.traveller]) {
          return {
            ...state,
            meals: {
              ...state.meals,
              [state.source]: {
                ...state.meals[state.source],
                [state.traveller]: [
                  ...state.meals[state.source][state.traveller],
                  action.payload,
                ],
              },
            },
          };
        }
        return {
          ...state,
          meals: {
            ...state.meals,
            [state.source]: {
              ...state.meals[state.source],
              [state.traveller]: [action.payload],
            },
          },
        };
      }
      return {
        ...state,
        meals: {
          ...state.meals,
          [state.source]: {
            [state.traveller]: [action.payload],
          },
        },
      };
    case "REMOVE_MEAL":
      const meals = state.meals[state.source][state.traveller];
      const mealsIndex = meals.findIndex(
        (meal) => meal.code === action.payload.code,
      );
      meals.splice(mealsIndex, 1);
      return {
        ...state,
        meals: {
          ...state.meals,
          [state.source]: {
            ...state.meals[state.source],
            [state.traveller]: [...meals],
          },
        },
      };


    case "ADD_BAGGAGE":
      if (state.baggage?.[state.source]) {
        if (state.baggage?.[state.source]?.[state.traveller]) {
          return {
            ...state,
            baggage: {
              ...state.baggage,
              [state.source]: {
                ...state.baggage[state.source],
                [state.traveller]: [
                  ...state.baggage[state.source][state.traveller],
                  action.payload,
                ],
              },
            },
          };
        }
        return {
          ...state,
          baggage: {
            ...state.baggage,
            [state.source]: {
              ...state.baggage[state.source],
              [state.traveller]: [action.payload],
            },
          },
        };
      }
      return {
        ...state,
        baggage: {
          ...state.baggage,
          [state.source]: {
            [state.traveller]: [action.payload],
          },
        },
      };
    case "REMOVE_BAGGAGE":
      const baggages = state.baggage[state.source][state.traveller];
      const baggageIndex = baggages.findIndex(
        (baggage) => baggage.code === action.payload.code,
      );
      baggages.splice(baggageIndex, 1);
      return {
        ...state,
        baggage: {
          ...state.baggage,
          [state.source]: {
            ...state.baggage[state.source],
            [state.traveller]: [...baggages],
          },
        },
      };


    case "UPDATE_SOURCE":
      return {
        ...state,
        source: action.payload
      };

    case "UPDATE_TRAVELLER":
      return {
        ...state,
        traveller: action.payload
      };


    default:
      return state;
  }
};
