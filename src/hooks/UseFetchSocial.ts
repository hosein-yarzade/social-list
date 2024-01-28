import {useState} from "react"
import axios from "axios"


export default function useFetchSocial() {
    const url = " http://localhost:3030/socials"
    const [data, setData] = useState([])
    const [error, setError] = useState<null | unknown>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const getList = () => {
        getAPIData("get")
    }
    const getAPIData = async (type = "get", postData?:any) => {
        switch (type) {
            case 'get':
                try {
                    setLoading(true)
                    const response = await axios.get(url)
                    console.log("get", response.data)
                    setData(response.data)
                } catch (err) {
                    setError(err)
                } finally {
                    setLoading(false)
                }
                break;
            case 'post':
                try {
                    setLoading(true)
                    await axios.post(url, {
                        id: postData.id,
                        social_id: postData.social_id,
                        social_link: postData.social_link
                    })
                    getList()
                } catch (err) {
                    setError(err)
                } finally {
                    setLoading(false)
                }
                break
            case 'delete':
                try {
                    setLoading(true)
                    await axios.delete(`${url}/${postData}`)
                    getList()
                } catch (err) {
                    setError(err)
                } finally {
                    setLoading(false)
                }
                break
            case 'put':
                try {
                    setLoading(true)
                    const response = await axios.put(`${url}/${postData.id}`,{
                        id: postData.id,
                        social_id: postData.social_id,
                        social_link: postData.social_link
                })
                    console.log("put", postData)
                    console.log("put", response.data)
                    getList()
                } catch (err) {
                    setError(err)
                } finally {
                    setLoading(false)
                }
                break
            // default:
            //     console.log(`Sorry, we are out of ${expr}.`);
        }

    }
    return {data, error, loading, getAPIData}

}
