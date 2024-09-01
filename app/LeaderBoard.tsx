import {InferSelectModel} from "drizzle-orm";
import {accountsNoIndex, accountsWithIndex} from "@/lib/database/schema";

type LeaderBoardProps = {
    users: InferSelectModel<typeof accountsNoIndex>[] | InferSelectModel<typeof accountsWithIndex>[]
}

export default function LeaderBoard({users}: LeaderBoardProps) {
    return <div className="flex flex-col gap-y-4 p-4 bg-gray-100 rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Leaderboard</h1>
        {users.map((user, index) => (
            <div
                key={user.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:bg-gray-50"
            >
                <div className="flex items-center gap-x-4">
                    <span className="text-lg font-semibold text-gray-700">{index + 1}.</span>
                    <img
                        src={user.profilePictureUrl}
                        alt={`${user.name}'s profile`}
                        className="w-12 h-12 rounded-full"
                    />
                    <span className="text-lg font-medium text-gray-900">{user.name}</span>
                </div>
                <div className="text-lg font-semibold text-blue-600">
                    {user.answeredThreads !== null ? user.answeredThreads : 0} threads
                </div>
            </div>
        ))}
    </div>
}