import SearchableLayout from "@/components/searchable-layout"
import style from "./index.module.css"
import type { ReactNode } from "react"
import books from "@/mock/books.json"
import BookItem from "@/components/book-item"

/**
 * ssr을 위한 함수
 * - next.js page route에서는 getServerSideProps 함수를 export 하는 경우 ssr이 적용된다.
 * - 서버측에서만 동작하는 함수로 해당 함수 안에서 console.log를 찍어보면 서버측에서만 찍히는 것을 확인할 수 있다.
 */
export const getServerSideProps = () => {
    // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
    const data = "hello"

    // 리턴된 데이터는 컴포넌트의 props로 전달된다.
    return {
        props: {
            data,
        },
    }
}
export default function Home({ data }: any) {
    console.log(data)
    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                {books.map((book) => (
                    <BookItem key={book.id} {...book} />
                ))}
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                {books.map((book) => (
                    <BookItem key={book.id} {...book} />
                ))}
            </section>
        </div>
    )
}
Home.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}
