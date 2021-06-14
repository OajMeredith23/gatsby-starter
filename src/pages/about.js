import * as React from 'react'
import Layout from '../components/Layout'
import OtherDesigners from '../components/OtherDesigners'
export default function About() {

    return (
        <Layout>
            <h1>About</h1>
            <p>
                The 2021 class is the first UX/UI Design class to graduate from Ravensbourne University.
                <br />
            </p>

            <OtherDesigners />
        </Layout>
    )
}