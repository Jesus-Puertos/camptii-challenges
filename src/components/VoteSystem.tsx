import { useEffect, useState } from "react"

interface PageInfo{
    categoryName: string,
    candidates: Candidate[]

}

interface Candidate{
    name: string,
    image: string,
    link?: string,}


const VoteSystem = () => {
    const category = 0

    const [pageInfo, setPageInfo] = useState<PageInfo>()


    useEffect(() => {
        async function fetchCandidates() {
            const response = await fetch(`/api/candidates.json?category=${category}`)
            const data = await response.json()
            setPageInfo(data)
            console.log(data)
        }
        fetchCandidates()
    }, [])
    
const {categoryName = '', candidates} = pageInfo ?? {}
  return (
    <div className="mx-auto flex flex-col max-w-7xl pt-8 mb-8">
        <CategoryTitle>
            {categoryName}
        </CategoryTitle>
        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-2 px-2 xl:px-0">
            {
                candidates?.map(candidate =>{
                    return(
                        <li >
                            <img src={candidate.image} alt={candidate.name} />
                            <p>
                                {candidate.name}
                            </p>
                            <a href={candidate.link}>Ver más</a>
                        </li>
                    )
                
                })
            }
        </ul>

        <footer>
            Navegacion
        </footer>
    </div>
  )
}

function CategoryTitle({children} : {children: String}){
    return(
        <h1 className="font-extralight m-auto mb-10 tracking-[1px] font-tomaso text-3xl max-w-xl flex justify-center items-center h-40">
            {children}
        </h1>
    )
}

export default VoteSystem