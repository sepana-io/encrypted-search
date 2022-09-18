import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from "@container/layout"
import { customTheme } from "@styles/theme";
import { Provider } from 'react-redux'
import { legacy_createStore as createStore} from 'redux'

const initialState = {
  address: null,
}

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'ADDRESS':
      return {
        ...state,
        address: action.data
      }
    default:
      return state
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <ChakraProvider theme={customTheme}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ChakraProvider>
    </Provider>
}
const store = createStore(reducer)

export default MyApp
