// import { FC, useReducer } from 'react'
// import { GlobalContext, GlobalReducer } from './'

// interface GlobalState {
//   property: boolean
// }

// const Global_INITIAL_STATE: GlobalState = { property: false }

// export const GlobalProvider: FC = ({ children }) => {
//   const [state, dispatch] = useReducer(GlobalReducer, Global_INITIAL_STATE)
//   return (
//     <GlobalContext.Provider value={{ ...state }}>
//       {children}
//     </GlobalContext.Provider>
//   )
// }
