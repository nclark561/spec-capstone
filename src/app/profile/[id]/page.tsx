type Params = {
    params: {
        id: string
    }
}

export default function ProfileId({ params: { id }}: Params) {
    return (
        <>
        <h1>this is a dynamic route</h1>
        <h1>{id}</h1>
        </>
    )
}
