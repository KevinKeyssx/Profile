import dynamic    from 'next/dynamic';
import {FC, memo, useEffect, useState} from 'react';

import Page           from '../components/Layout/Page';
// import {Loading}		from '../components/Loading';
import About          from '../components/Sections/About';
import Footer         from '../components/Sections/Footer';
import Hero           from '../components/Sections/Hero';
import Portfolio      from '../components/Sections/Portfolio';
import Resume         from '../components/Sections/Resume';
// import Testimonials   from '../components/Sections/Testimonials';
import {homePageMeta} 	from '../data/data';
import {ILov} 			from '../data/lov.interface';
import {useFetch} 		from '../hooks/useFetch';
import {Constants} 		from '../utils/constants';
// eslint-disable-next-line react-memo/require-memo
const Header = dynamic(() => import('../components/Sections/Header'), {ssr: false});


const Home: FC = memo(() => {
	const {title, description}  = homePageMeta;

	// const [ loaded, setLoaded ] = useState( false );

	const [data, setData] = useState( [{
		id         		: "",
		description		: "",
		lov_vals   		: [],
		active     		: true,
		comment    		: "",
		created_at 		: new Date(),
		skill      		: {},
	}] as ILov[] );

	useEffect(() => {
		getData();
	}, []);

	const getData = async() => {
		const url	= `${process.env.NEXT_PUBLIC_API_URL}lov/${Constants.END_POINT_SEARCH_ALL}`;
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const lov = await useFetch<ILov[]>( url, 'GET' );
		setData( lov );
		// setLoaded( true );
	}

	return (
		<Page description={description} title={title}>
				{/* loaded ?
				( */}
				<Header />
				<Hero 		children = { data }/>
				<About 		children = { data }/>
				<Resume 	children = { data }/>
				<Portfolio 	children = { data }/>
				<Footer />
				{/* ) : */}
				{/* <Loading/> */}
		</Page>
	);
});

export default Home;
