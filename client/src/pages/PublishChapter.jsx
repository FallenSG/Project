import { useState } from 'react'
import { useLocation } from "react-router-dom";

import { PageLayoutOverload } from '../Components/PageLayout'
import Editor from '../Components/Editor'
import PubNavbar from '../Components/PubNavbar'
import { useFetch } from '../customHooks/DataHandler';


export function PublishChapCreate() {
    const [chapVal, setChapVal] = useState({ title: "", content: "" })

    return (
        <PageLayoutOverload
            nav="none"
            elem={<PubNavbar val={chapVal} />}
            gridElem={<Editor setVal={setChapVal} val={chapVal} />}
            columns={16}
            gridXs={15}
        />
    )
}

export function PublishChapEdit() {
    const chapId = useLocation().pathname.split('/')[4];
    const [chapVal, setChapVal] = useState({ title: "", content: "" })

    useFetch(`/chapter/api/${chapId}`, false, (result) => {
        setChapVal({ title: result?.bookInfo?.publish[0], content: result?.chapter })
    })

    return (
        <PageLayoutOverload
            nav="none"
            elem={<PubNavbar val={chapVal} />}
            gridElem={<Editor setVal={setChapVal} val={chapVal} />}
            columns={16}
            gridXs={15}
        />
    )
}
