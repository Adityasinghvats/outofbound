import LatestQuestions from "../components/LatestQuestions";
import TopContributers from "../components/TopContributors";

const Page = async () => {
    return (
        <div className="mt-20 container mx-auto px-4 py-8">
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="w-full">
                    <h1 className="m-4 text-3xl">Top Contributors</h1>
                    <TopContributers />
                </div>
                <div className="w-full">
                    <h1 className="m-4 text-3xl">Latest Questions</h1>
                    <LatestQuestions />
                </div>
            </div>
        </div>
    )
}

export default Page;