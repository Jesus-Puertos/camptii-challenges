import { useEffect, useState } from "react"

interface PageInfo{
    categoryName: string,
    candidates: Candidate[]

}

interface Candidate{
    id: string,
    name: string,
    image: string,
    link?: string,}

    type Votes = Array<Array<number>>
    
const MAX_CATEGORIES = 4
const MAX_VOTES_PER_CATEGORY = 1


const VoteSystem = () => {
    const [pageInfo, setPageInfo] = useState<PageInfo>()
    const [category, setCategory] = useState(0)
    const [Votes, setVotes] = useState<Votes>(Array.from({length: MAX_CATEGORIES}, () => []))   

    useEffect(() => {
        async function fetchCandidates() {
            const response = await fetch(`/api/candidates.json?category=${category}`)
            const data = await response.json()
            setPageInfo(data)
            console.log(data)
        }
        fetchCandidates()
    }, [category])

    const handleNavigation = (categoryIndex: number) => {
        if(categoryIndex < 0) categoryIndex = MAX_CATEGORIES - 1
        else if(categoryIndex > (MAX_CATEGORIES - 1)) categoryIndex = 0
        setCategory(categoryIndex)
    }

    const handleVote = ({category, candidate}: {category: number, candidate: number}) => {
    const votesCategory = Votes[category]
    //if it was already voted the item, remove it
        if(votesCategory.includes(candidate)){
            const newVotes = votesCategory.filter(vote => vote !== candidate)
            setVotes(prevVotes => prevVotes.with(category, newVotes))
            return
        }
         //Check if the candidate is already voted
        if(votesCategory.length >= 1) return

        //otherwise , add the vote
        const newVotes = [...votesCategory, candidate]
        setVotes(prevVotes => prevVotes.with(category, newVotes))
    }
    
const {categoryName = '', candidates} = pageInfo ?? {}
const votesCategory = Votes[category]

  return (
    <div className="mx-auto flex flex-col max-w-7xl pt-8 mb-8">
        <CategoryTitle>
            {categoryName}
        </CategoryTitle>
        
        <div className='font-semibold flex justify-center items-center gap-x-2 px-2 rounded py-3 -mt-24 mb-10 text-yellow-300 text-xl'>
                Votos realizados:
				<span className='text-3xl'>
					{votesCategory.length}/{MAX_VOTES_PER_CATEGORY}
				</span>
			</div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-2 px-2 xl:px-0">
            {
                candidates?.map((candidate, index) =>{
                    const isVoted = votesCategory.includes(candidates.indexOf(candidate))
                    return(
                        <li className={`${isVoted ? 'bg-yellow-500' : 'bg-blue-900 hover:bg-sky-400'} transition p-1 `}>
                            <button onClick={()=>handleVote({category, candidate : index})}>
                            <img src={candidate.image} alt={candidate.name} />
                            <p>
                                {candidate.name}
                            </p>
                            </button>
                            <a href={candidate.link}>Ver más</a>
                        </li>
                    )
                
                })
            }
        </ul>

        <footer className="flex justify-center items-center mt-4 gap-x-20">
        <div className="flex justify-center items-center gap-x-2 bg-black/50 backdrop-blur-lg px-4 rounded py-2">
                Votos realizados: {votesCategory.length}/{MAX_VOTES_PER_CATEGORY}
            </div>


            <div className="flex justify-center items-center gap-x-2 bg-black/50 backdrop-blur-lg px-4 rounded py-2">
            <button className=" rounded border border-white hover:border-transparent hover:bg-white hover:text-yellow-500 p-2 transition" onClick={()=> handleNavigation(category - 1)} >
             <Arrow rotated />
            </button>

                <span className="text-lg font-semibold"> Categoria <span>{category + 1}/{MAX_CATEGORIES}</span></span>

            <button className=" rounded border border-white hover:border-transparent hover:bg-white hover:text-yellow-500 p-2 transition" onClick={()=> handleNavigation(category + 1)} >
             <Arrow/> 
            </button>
            </div>
            
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

function Arrow({rotated} : {rotated?:boolean}){

    const className = rotated ? '-rotate-180' : ''
    return(
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className={className}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 7h-6l4 5l-4 5h6l4 -5z" /></svg>
    )
}

export default VoteSystem