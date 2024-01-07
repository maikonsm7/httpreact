import { useState, useEffect } from "react";

// custon hook
export const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [config, setConfig] = useState(null)
    const [method, setMethod] = useState(null)
    const [callFetch, setCallFetch] = useState(false)
    const [idItem, setIdItem] = useState(null)

    // loading
    const [loading, setLoading] = useState(false)

    const httpConfig = (data, method) => {
        if(method === 'POST'){
            setConfig({
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            setMethod(method)
        }else if(method === 'DELETE'){
            setConfig({
                method,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setMethod(method)
            setIdItem(data)
        }
    }

    useEffect(() => {
        (async ()=>{
            setLoading(true)
            const res = await fetch(url)
            const resData = await res.json()
            setData(resData)
            setLoading(false)
        })()
    }, [url, callFetch])

    useEffect(() => {
        (async () => {
            let resData
            if(method === 'POST'){
                let fetchOptions = [url, config]
                const res = await fetch(...fetchOptions)
                resData = await res.json()
            }else if(method === 'DELETE'){
                const deleteUrl = `${url}/${idItem}`
                const res = await fetch(deleteUrl, config)
                resData = await res.json()
            }
            setCallFetch(resData)
        })()
    }, [config, method, url])

    return {data, httpConfig, loading}
}