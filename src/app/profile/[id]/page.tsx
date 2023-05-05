import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

//@ts-ignore
function ProfileId({ param }) {
    return (
        <h1>{param}</h1>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { param } = context.query
    return { props: { param }}
}

export default ProfileId