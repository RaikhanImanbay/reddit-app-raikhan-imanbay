import React, { useState } from "react";
import { Container, Card } from "@material-ui/core";
import { CREATE_NEW_LINK, getPortionOfLinks } from "../../pages/api/queries/links";
import InfiniteScroll from "react-infinite-scroll-component";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useMutation } from "@apollo/client";
import styles from '../../styles/Home.module.css'
import Vote from '../feed/Vote';

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [createNewLink] = useMutation(CREATE_NEW_LINK);
    const getMorePost = async () => {
        const { count, links: newPosts } = await getPortionOfLinks(10, posts.length);
        setPosts((post) => [...post, ...newPosts]);
        if (posts.length === count) {
            setHasMore(false);
        }
    };

    const handleSubmitPost = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            link: data.get('newLink'),
            description: data.get('newDescription'),
        };

        const res = await createNewLink({
            variables: {
                link: userData.link,
                description: userData.description,
            }
        });
    };

    return (
        <Container maxWidth="sm">
            <Box component="form" onSubmit={handleSubmitPost} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="link"
                    label="Add new link"
                    name="newLink"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="Add new description"
                    name="newDescription"
                    autoFocus
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Post
                </Button>
            </Box>
            <InfiniteScroll
                dataLength={posts.length}
                next={getMorePost}
                hasMore={hasMore}
                loader={<h3> Loading...</h3>}
                endMessage={<h4>Nothing more to show</h4>}
            >
                {posts.map((data) => (
                    <Card key={data.id} variant="outlined" className={styles.card}>
                        <Vote linkId={data.id} />
                        <a href={`//${data.url}`} target="_blank" rel="noreferrer">
                            {data.description}
                        </a>
                    </Card>
                ))}
            </InfiniteScroll>
        </Container>
    );
}