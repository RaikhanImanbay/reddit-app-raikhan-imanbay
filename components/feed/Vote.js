import React, { useState } from 'react'
import { UpvoteIcon } from "../icons/UpvoteIcon";
import { VOTE_LINK } from '../../pages/api/queries/votes';
import { useMutation } from "@apollo/client";

export default function Vote({ linkId }) {
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [voteLink] = useMutation(VOTE_LINK);

    const handleClick = async () => {
        const id = await voteLink({
            variables: {
                linkId: linkId
            }
        });

        if (id) {
            setIsUpvoted(true)
        }
    };
    return (
    
        <button onClick={handleClick}>
            <UpvoteIcon />
            {
                isUpvoted && alert(`Link ${linkId} was successully upvoted`) && setIsUpvoted(false)
            }
        </button>
    
    )
}