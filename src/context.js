import React from 'react';

const StateContext = React.createContext();
const DispatchContext = React.createContext();

// handle the reducer
const stateReducer = (state, action) => {
  switch (action.type) {
    case 'isMenuVisible': {
      return { ...state, isMenuVisible: !state.isMenuVisible };
    }

    case 'isMobileMenu': {
      return { ...state, isMobileMenu: !state.isMobileMenu };
    }

    case 'isDarkMode': {
      const { value } = action;
      localStorage.setItem('isDarkMode', value);

      if (value === 'true') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      return { ...state, isDarkMode: value };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const initialState = {
  isMenuVisible: false,
  isMobileMenu: false,
  isDarkMode: undefined,
};

function StateProvider({ children }) {
  const [state, dispatch] = React.useReducer(stateReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

function useAppState() {
  const context = React.useContext(StateContext);
  if (context === undefined) {
    throw new Error('useContext must be used within a StateProvider');
  }
  return context;
}

function useAppDispatch() {
  const context = React.useContext(DispatchContext);
  if (context === undefined) {
    throw new Error('useContext must be used within a StateProvider');
  }
  return context;
}

function useContext() {
  return [useAppState(), useAppDispatch()];
}

export { StateProvider, useContext };
