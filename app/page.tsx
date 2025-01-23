import ActionButtons from '@/app/ActionButtons';
import LeaderBoard from '@/app/LeaderBoard';
import { db } from '@/lib/database';
import { accountsNoIndex, accountsWithIndex } from '@/lib/database/schema';
import { count, desc } from 'drizzle-orm';
import { performance } from 'perf_hooks';

export const dynamic = 'force-dynamic'

export default async function Home() {
	let startTime = performance.now();
	const first25NoIndex = await db.query.accountsNoIndex.findMany({
		orderBy: [desc(accountsNoIndex.answeredThreads)],
		limit: 25,
	});
	let endTime = performance.now();
	const noIndexPerformanceTime = (endTime - startTime).toFixed(2);

	startTime = performance.now();
	const first25WithIndex = await db.query.accountsWithIndex.findMany({
		orderBy: [desc(accountsWithIndex.answeredThreads)],
		limit: 25,
	});
	endTime = performance.now();
	const withIndexPerformanceTime = (endTime - startTime).toFixed(2);

	const countedEntries = await db.select({ count: count() }).from(accountsNoIndex);

	return (
		<div className={'flex gap-x-8'}>
			<div>
				<p>Total Entries: {countedEntries[0].count}</p>
				<p>With index: {withIndexPerformanceTime}ms</p>
				<p>No index: {noIndexPerformanceTime}ms</p>
				<ActionButtons />
			</div>
			<div className={'flex gap-x-4'}>
				<div className={'flex flex-col gap-y-4'}>
					<h1 className={'text-4xl font-bold'}>With index</h1>
					<LeaderBoard users={first25WithIndex} />
				</div>
				<div className={'flex flex-col gap-y-4'}>
					<h1 className={'text-4xl font-bold'}>No index</h1>
					<LeaderBoard users={first25NoIndex} />
				</div>
			</div>
		</div>
	);
}
