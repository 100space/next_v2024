import GlobalLayout from "@/components/global-layout"
import "@/styles/globals.css"
import type { NextPage } from "next"
import type { AppProps } from "next/app"
import type { ReactNode } from "react"

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactNode) => ReactNode
}

export default function App({
    Component,
    pageProps,
}: AppProps & {
    Component: NextPageWithLayout
}) {
    const getLayout = Component.getLayout ?? ((page) => page)
    return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>
}
