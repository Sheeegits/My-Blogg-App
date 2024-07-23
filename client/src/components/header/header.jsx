import { AppBar, Toolbar, styled } from '@mui/material'; 
import { Link, useNavigate } from 'react-router-dom'; // Combined imports

const Component = styled(AppBar)`
    background: #FFFFFF;
    color: black;
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px;
        color: #000;
        text-decoration: none;
    }
`;

const Header = () => {
    const navigate = useNavigate();

    const logout = async () => {
        // Add logout logic here, if needed
        // e.g., clear sessionStorage, send logout request to server
        sessionStorage.clear();
        navigate('/account');
    };
        
    return (
        <Component>
            <Container>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <Link to='/account' onClick={logout}>LOGOUT</Link> {/* Use logout function */}
            </Container>
        </Component>
    )
}

export default Header;
