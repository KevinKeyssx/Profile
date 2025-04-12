import dynamic    from 'next/dynamic';
import {FC, memo, useEffect, useState} from 'react';

import Page     		from '../components/Layout/Page';
import {Loading}		from '../components/Loading';
// import About          	from '../components/Sections/About';
import Footer         	from '../components/Sections/Footer';
import Hero           	from '../components/Sections/Hero';
// import Portfolio      	from '../components/Sections/Portfolio';
import Resume         	from '../components/Sections/Resume';
import {ILov} 			from '../data/lov.interface';
// import Testimonials   from '../components/Sections/Testimonials';
// eslint-disable-next-line react-memo/require-memo
const Header = dynamic(() => import('../components/Sections/Header'), {ssr: false});


const Home: FC = memo(() => {
	const homePageMeta = {
		title       : 'KevinKeyssx',
		description : "My personal profile",
	};

	const {title, description}  = homePageMeta;

	const [ loaded, setLoaded ] = useState( false );

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
		try {
			const response  = await fetch( '/api/profile-info' );
			const lov       = await response.json();
			const fail      = lov as { detail: string };

            if ( fail.detail ) return;

			setData(lov as ILov[]);
			setLoaded(true);
		} catch (error) {
			console.error('Error fetching profile data:', error);
		}
	}

	if ( !loaded ) {
		return (
			<Page description={description} title={title}>
				<Loading/>
			</Page>
		);
	}

	return (
		// eslint-disable-next-line react-memo/require-usememo
		<Page description={description} title={title}>
			<Header />
			<Hero 		children = { data }/>
			{/* <About 		children = { data }/> */}
			<Resume 	children = { data }/>
			{/* <Portfolio 	children = { data }/> */}
			<Footer children = { data } />
		</Page>
	);
});

export default Home;
