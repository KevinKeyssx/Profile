import dynamic    from 'next/dynamic';
import {FC, memo, useState, useEffect} from 'react';

import Page         from '../components/Layout/Page';
import {Loading}    from '../components/Loading';
import Footer       from '../components/Sections/Footer';
import Hero         from '../components/Sections/Hero';
import Resume       from '../components/Sections/Resume';
import {ILov}       from '../data/lov.interface';
// import Portfolio     from '../components/Sections/Portfolio';
// import About         from '../components/Sections/About';
// import Testimonials  from '../components/Sections/Testimonials';

const Header = dynamic(() => import('../components/Sections/Header'), {ssr: false});

const Home: FC = memo(() => {
	const homePageMeta = {
		title       : 'KevinKeyssx',
		description : "My personal profile",
	};

	const {title, description}  = homePageMeta;
    const profileKey            = 'profile-data';
    const dateKey               = 'profile-date';

    const [profileData, setProfileData] = useState<ILov[] | null>( null );
    const [isLoading, setIsLoading]     = useState( true );

    useEffect(() => {
        const loadData = async () => {
            try {
                if ( typeof window !== 'undefined' ) {
                    const cachedData    = localStorage.getItem( profileKey );
                    const cachedMonth   = localStorage.getItem( dateKey );
                    const date          = new Date();

                    if ( cachedData && cachedMonth ) {
                        if ( date.getMonth().toString() !== cachedMonth && date.getDate() === 1 ) {
                            localStorage.removeItem( profileKey );
                            localStorage.removeItem( dateKey );
                        } else {
                            setProfileData( JSON.parse( cachedData ));
                            setIsLoading( false );
                            return;
                        }
                    }

                    const response  = await fetch( '/api/profile-info' );
                    const data      = await response.json();

                    localStorage.setItem( profileKey, JSON.stringify( data ));
                    localStorage.setItem( dateKey, new Date().getMonth().toString() );

                    setProfileData( data );
                    setIsLoading( false );
                }
            } catch (e) {
                console.error( 'Error al leer localStorage:', e );
            }
        };

        loadData();
    }, []);

	if ( isLoading ) {
		return (
			<Page description={description} title={title}>
				<Loading/>
			</Page>
		);
	}

	return (
        <Page description={description} title={title}>
            <Header />
            <Hero 		children = { profileData }/>
            {/* <About 		children = { profileData }/> */}
            <Resume 	children = { profileData }/>
            {/* <Portfolio 	children = { profileData }/> */}
            <Footer children = { profileData } />
        </Page>
	);
});

export default Home;
