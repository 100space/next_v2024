import BookItem from "@/components/book-item"
import SearchableLayout from "@/components/searchable-layout"
import fetchBooks from "@/lib/fetch-books"
import fetchRandomBooks from "@/lib/fetch-random-books"
import type { InferGetServerSidePropsType } from "next"
import { type ReactNode } from "react"
import style from "./index.module.css"

/**
 * ssr을 위한 함수
 * - next.js page route에서는 getServerSideProps 함수를 export 하는 경우 ssr이 적용된다.
 * - 서버측에서만 동작하는 함수로 해당 함수 안에서 console.log를 찍어보면 서버측에서만 찍히는 것을 확인할 수 있다.
 */
export const getServerSideProps = async () => {
    const [allbooks, recobooks] = await Promise.all([fetchBooks(), fetchRandomBooks()])

    return {
        // 리턴된 데이터는 컴포넌트의 props로 전달된다.
        props: {
            allbooks,
            recobooks,
        },
    }
}

// Home 컴포넌트
// - 서버측에서 한번 실행되고, 클라이언트측에서는 한번 더 실행된다. 그렇기 때문에 console.log(data)는 서버측에서 한번, 클라이언트측에서 한번 찍힌다.
export default function Home({ allbooks, recobooks }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                {recobooks.map((book) => (
                    <BookItem key={book.id} {...book} />
                ))}
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                {allbooks.map((book) => (
                    <BookItem key={book.id} {...book} />
                ))}
            </section>
        </div>
    )
}
Home.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}
