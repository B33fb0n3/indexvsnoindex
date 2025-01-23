'use client';

import { addAllToDB, addOne } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function ActionButtons() {
	const [loading, setIsLoading] = useState(false);
	const [seedingDone, setIsSeedingDone] = useState(false);
	const [lastInsertTiming, setLastInsertTiming] = useState<{
		insertNoIndexTime?: string;
		insertWithIndexTime?: string;
	}>({});

	return (
		<div>
			<div>
				<Button
					disabled={loading}
					onClick={async () => {
						setIsLoading(true);
						const result = await addOne();
						setLastInsertTiming(result);
						setIsLoading(false);
					}}>
					Add one to random
				</Button>
				<Button
					disabled={loading}
					onClick={async () => {
						setIsLoading(true);
						await addAllToDB();
						setTimeout(() => {
							setIsSeedingDone(true);
						}, 500);
					}}>
					Seed
				</Button>
				{!seedingDone ? (
					loading && <p className={'text-red-500 font-bold'}>WAIT!</p>
				) : (
					<p className={'text-red-500 font-bold'}>RELOAD the page now!</p>
				)}
			</div>
			<div>
				<h2 className={'text-xl font-medium'}>Last Insert took:</h2>
				<p>No index: {lastInsertTiming.insertNoIndexTime ?? '-'}ms</p>
				<p>With index: {lastInsertTiming.insertWithIndexTime ?? '-'}ms</p>
			</div>
		</div>
	);
}
