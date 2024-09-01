import ActionButtons from "@/app/ActionButtons";
import {db} from "@/lib/database";
import {desc} from "drizzle-orm";
import {accountsNoIndex, accountsWithIndex} from "@/lib/database/schema";
import {performance} from 'perf_hooks';
import LeaderBoard from "@/app/LeaderBoard";

export default async function Home() {
    let startTime = performance.now();
    const first25NoIndex = await db.query.accountsNoIndex.findMany({
        orderBy: [desc(accountsNoIndex.answeredThreads)],
        limit: 25,
    });
    let endTime = performance.now();
    const noIndexPerformanceTime = (endTime - startTime).toFixed(2)

    startTime = performance.now();
    const first25WithIndex = await db.query.accountsWithIndex.findMany({
        orderBy: [desc(accountsWithIndex.answeredThreads)],
        limit: 25,
    });
    endTime = performance.now();
    const withIndexPerformanceTime = (endTime - startTime).toFixed(2)

    return (
        <div className={"flex gap-x-8"}>
            <div>
                <p>With index: {withIndexPerformanceTime}ms</p>
                <p>No index: {noIndexPerformanceTime}ms</p>
                <ActionButtons/>
            </div>
            <div className={"flex gap-x-4"}>
                <div className={"flex flex-col gap-y-4"}>
                    <h1 className={"text-4xl font-bold"}>With index</h1>
                    <LeaderBoard users={first25WithIndex}/>
                </div>
                <div className={"flex flex-col gap-y-4"}>
                    <h1 className={"text-4xl font-bold"}>No index</h1>
                    <LeaderBoard users={first25NoIndex}/>
                </div>
            </div>
        </div>
    );
}
