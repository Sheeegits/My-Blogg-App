import React, { useState, useEffect, useContext } from 'react';
import { styled, Box, TextareaAutosize, Button, InputBase, FormControl } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
};

const Update = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const { account } = useContext(DataContext);

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState(null);
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    // Fetch post data by id
    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    let response = await API.getPostById(id);
                    setPost(response.data);
                } catch (error) {
                    console.error('Error fetching post data:', error);
                }
            }
        };
        fetchData();
    }, [id]);

    // Handle file upload and update post categories and username
    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                try {
                    const response = await API.uploadFile(data);
                    setPost(prevPost => ({
                        ...prevPost,
                        picture: response.data
                    }));
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }
        };
        getImage();
    }, [file]);

    useEffect(() => {
        setPost(prevPost => ({
            ...prevPost,
            categories: new URLSearchParams(location.search).get('category') || 'All',
            username: account.username
        }));
    }, [location.search, account.username]);

    const updateBlogPost = async () => {
        try {
            let response = await API.updatePost(post);
            if (response.isSuccess) {
                navigate(`/details/${id}`);
            }
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost(prevPost => ({
            ...prevPost,
            [name]: value
        }));
    };

    return (
        <Container>
            <Image src={url} alt="post" />
            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField 
                    value={post.title}
                    onChange={handleChange}
                    name='title'
                    placeholder="Title"
                />
                <Button onClick={updateBlogPost} variant="contained" color="primary">Update</Button>
            </StyledFormControl>
            <Textarea
                rowsMin={5}
                placeholder="Tell your story..."
                value={post.description}
                onChange={handleChange}
                name='description'
            />
        </Container>
    );
};

export default Update;
