import { UpvoteIcon } from "../icons/UpvoteIcon";
import {VOTE_LINK} from '../../pages/api/queries/votes';
import { useMutation } from "@apollo/client";

export default function Vote () {

    const [voteLink] = useMutation(VOTE_LINK);

    const handleClick = async (event) => {
        event.preventDefault();
        const link = {
            linkid: data.get('linkid')
        };

        const id = await voteLink({
            variables: {
                link: link.linkid
            }
        });

        console.log(id);

    return (
        
            <button onClick={handleClick}>
                <UpvoteIcon/>
            </button>

    )
};
}