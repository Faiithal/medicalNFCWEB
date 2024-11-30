import { URL } from "./configuration";

export const index = async () => {
    const result = await fetch(`${URL}/conditions`, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }

    }
    )
    return await result.json()
}

export const store = async (name) => {
    const result = await fetch(`${URL}/conditions`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            condition: name
        })
    })
    console.log(JSON.stringify(name))
    return await result.json()
}