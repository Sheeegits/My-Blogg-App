import { Grid } from '@mui/material';

//components
import Banner from '../banner/Banner';
import Categories from './categories.jsx';
import Post from './posts/Posts.jsx';

const Home = () => {

    return (
        <>
            <Banner />
            <Grid container>
                <Grid item lg={2} xs={12} sm={2}>
                    <Categories />
                </Grid>
                <Grid container item xs={12} sm={10} lg={10}>
                    <Post/>
                </Grid>
            </Grid>
        </>
    )
}

export default Home;