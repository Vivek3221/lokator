import {
  GET_COUNTRY,
  GET_LOCATIONS,
  ADD_COUNTRY,
  DELETE_PASSION,
  DELETE_SUBSCRIPTION,
  GET_CONTACT,
  ADD_ADVERTISMENT,
  DELETE_ADVERTISMENT,
  GET_USERS,
  EDIT_COUNTRY,
  EDIT_ADVERTISMENT,
  GET_DASHBOARD,
  GET_REPORT,
  GET_CAPACITY,
  ADD_CAPACITY,
  EDIT_CAPACITY,
  GET_TYPE,
  ADD_TYPE,
  EDIT_TYPE,
  GET_CATEGORY,
  ADD_CATEGORY,
  EDIT_CATEGORY,
  SELECT_IMAGE,
  ADD_MACHINE,
  GET_MACHINES,
  EDIT_MACHINE
} from "../types";

const initialState = {
  dashboard: [],
  countries: [],
  locations: [],
  contacts: [],
  users: [],
  reports: [],
  selectedImage:""
  
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRY:
      return {
        ...state,
        countries: action.payload,
      };
    case GET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
      };
    case ADD_COUNTRY:
      return {
        ...state,
        countries: [action.payload.data, ...state.countries],
      };
    case EDIT_COUNTRY:
      var { countries } = state;
      var updatedCountry = countries.map((item) => {
        if (item.id == action.payload.id) {
          return action.payload;
        }
        return item;
      });
      return {
        ...state,
        countries: updatedCountry,
      };
    case DELETE_PASSION:
      var { passions } = state;
      var updatedPassion = passions.filter(
        (item) => item._id !== action.payload
      );
      return {
        ...state,
        passions: updatedPassion,
      };
    // eslint-disable-next-line no-fallthrough
    case GET_CONTACT:
      return {
        ...state,
        contacts: action.payload,
      };
    case ADD_ADVERTISMENT:
      return {
        ...state,
        advertisment: [action.payload, ...state.advertisment],
      };

    case EDIT_ADVERTISMENT:
      var { advertisment } = state;
      var updatedAdvertisment = advertisment.map((item) => {
        if (item._id == action.payload._id) {
          return action.payload;
        }
        return item;
      });
      return {
        ...state,
        advertisment: updatedAdvertisment,
      };
    case DELETE_ADVERTISMENT:
      var { advertisment } = state;
      var updatedAdvertisment = advertisment.filter(
        (item) => item._id !== action.payload
      );
      return {
        ...state,
        advertisment: updatedAdvertisment,
      };

    case DELETE_SUBSCRIPTION:
      var { subscriptions } = state;
      var updatedSubscriptions = subscriptions.filter(
        (item) => item._id !== action.payload
      );
      return {
        ...state,
        subscriptions: updatedSubscriptions,
      };

    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_CAPACITY:
        return {
          ...state,
          capacity: action.payload,
    };
    case ADD_CAPACITY:
      var { capacity:{capacityList} } = state;
    
      return {
        ...state,
        capacity:{capacityList:[action.payload,...capacityList]}
        
      };

    case EDIT_CAPACITY:
      var { capacity:{capacityList} } = state;
      var updatedCapacity = capacityList.map((item) => {
        if (item.id == action.payload.id) {
          return action.payload;
        }
        return item;
      });
      return {
        ...state,
        types:{capacityList:updatedCapacity}
        
      };
      case GET_MACHINES:
        return {
          ...state,
          machines: action.payload,
    };
    case ADD_MACHINE:
      var { machines:{productsData} } = state;
    
      return {
        ...state,
        machines:{productsData:[action.payload,...productsData]}
        
      };

    case EDIT_MACHINE:
      var { machines:{productsData} } = state;
      var updatedCapacity = productsData.map((item) => {
        if (item.id == action.payload.id) {
          return action.payload;
        }
        return item;
      });
      return {
        ...state,
        machines:{productsData:updatedCapacity}
        
      };
      case GET_TYPE:
        return {
          ...state,
          types: action.payload,
    };
    
    case ADD_TYPE:
      var { types:{typeList} } = state;
    
      return {
        ...state,
        capacity:{typeList:[action.payload,...typeList]}
        
      };

    case EDIT_TYPE:
      var { types:{typeList} } = state;
      var updatedTypes = typeList.map((item) => {
        if (item.id == action.payload.id) {
          return action.payload;
        }
        return item;
      });
      return {
        ...state,
        types:{typeList:updatedTypes}
        
      };  
    case GET_CATEGORY:
        return {
          ...state,
          category: action.payload,
    };
    case ADD_CATEGORY:
      var { category:{categoryList} } = state;
    
      return {
        ...state,
        category:{categoryList:[action.payload,...categoryList]}
        
      };

    case EDIT_CATEGORY:
      var { category:{categoryList} } = state;
      var updatedTypes = categoryList.map((item) => {
        if (item.id == action.payload.id) {
          return action.payload;
        }
        return item;
      });
      return {
        ...state,
        category:{categoryList:updatedTypes}
        
      }; 
      case SELECT_IMAGE:
      return {
        ...state,
        selectedImage:action.payload
        
      };  
 default:
      return state;
  }
}
