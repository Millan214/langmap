import type { NextPage } from 'next'
import Head from 'next/head'
import { Provider } from 'react-redux'
import store from '../components/redux/store'
import MyApp from '../components/app/MyApp'

const Home: NextPage = () => {

	return (
		<>

			<Head>
				<title>LangMap</title>
				<meta name="description" content="A web application to add and manage words in different languages" />
			</Head>

			<Provider store={store}>

				<MyApp />

			</Provider>
		</>

	)
}

export default Home
