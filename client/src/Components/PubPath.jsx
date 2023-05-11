import { useContext } from 'react'
import { useLocation } from "react-router-dom";
import { Typography, Link, Breadcrumbs } from '@mui/material';

import { Context } from './PageLayout'

function pathEst(path) {
    let Break = 3;
    let arr = path.split('/').filter((x, i) => {
        if (i>1 && i < Break) {
            if (i === 2 && x === 'chapter') Break++;
            return x;
        }
        return ""
    })
    return arr;
}

export default function Path() {
    const path = pathEst(useLocation().pathname);

    const title = useContext(Context)?.book_id?.title;

    const title1 = useContext(Context)?.title
    const _id1 = useContext(Context)?._id;

    const bookId = useLocation().pathname.split('/')[4]

    return (
        <Breadcrumbs sx={{ pl: "24px", display: { xs: "none", sm: 'block' }, fontVariantCaps: "petite-caps" }}>
            {path[0] !== 'list' ?
                <Link href="/publish/list" underline="hover" color="black">Home</Link> : ""
            }
            
            {path[0] === 'view' ?
                <Typography color="black">{title}</Typography> : ""
            }

            {path[0] === 'create' ? 
                <Typography color="black">Create</Typography> : ""
            }

            {path[0] === 'modify' ?
                <Breadcrumbs>
                    <Link href={`/publish/view/${_id1}`} underline="hover">{title1}</Link>
                    <Typography>Modify</Typography>
                </Breadcrumbs> : ""
            }

            {path[1] === 'create' ? 
                <Breadcrumbs>
                    <Link href={`/publish/view/${bookId}`} underline="hover" color="black">Book</Link>
                    <Typography color="black">Chapter Creation</Typography> : ""
                </Breadcrumbs> : ""
            }

            {path[1] === 'edit' ?
                <Breadcrumbs>
                    <Link href={`/publish/view/${bookId.split('_')[0]}`} underline="hover" color="black">Book</Link>
                    <Typography color="black">Chapter Edit</Typography> : ""
                </Breadcrumbs> : ""
            }

        </Breadcrumbs>

    )
}

