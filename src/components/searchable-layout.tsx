import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import style from "./searchable-layout.module.css"

export default function SearchableLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [search, setSearch] = useState("")

    const q = router.query.q as string

    useEffect(() => {
        if (q) {
            setSearch(q || "")
        }
    }, [q])

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }
    const onSubmit = () => {
        if (!search || q === search) return
        router.push(`/search?q=${search}`)
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSubmit()
        }
    }

    return (
        <div>
            <div className={style.searchbar_container}>
                <input
                    placeholder="검색어를 입력하세요..."
                    onKeyDown={onKeyDown}
                    value={search}
                    onChange={onChangeSearch}
                />
                <button onClick={onSubmit}>검색</button>
            </div>
            {children}
        </div>
    )
}
