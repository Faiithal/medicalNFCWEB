import { URL } from "./configuration";

export const show = async (id) =>{
    try {
    const result = await fetch(`${URL}/patients/${id}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        }
    )
    return await result.json()
} catch (error) {
    return error
}
}

export const update = async (id, body) => {
    const result = await fetch(`${URL}/patients/${id}?_method=PATCH`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(body)
        }
    )
    return await result.json()
}   