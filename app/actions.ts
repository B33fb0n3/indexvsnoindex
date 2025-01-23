'use server';

import { db } from '@/lib/database';
import { accountsNoIndex, accountsWithIndex } from '@/lib/database/schema';
import { generateUuid } from '@/lib/utils';
import { faker } from '@faker-js/faker';
import { InferInsertModel } from 'drizzle-orm';
import { performance } from 'perf_hooks';

export const addAllToDB = async () => {
	const [] = await Promise.all([db.delete(accountsNoIndex), db.delete(accountsWithIndex)]);

	const newEntries = 10000;

	const noIndexUser: InferInsertModel<typeof accountsNoIndex>[] = [];
	const withIndexUser: InferInsertModel<typeof accountsWithIndex>[] = [];

	for (let i = 0; i < newEntries; i++) {
		const noIndexUserId = generateUuid('acc_no');
		const withIndexUserId = generateUuid('acc_with');

		let answeredThreads;

		// Determine the range for answeredThreads based on a 10% probability
		if (Math.random() < 0.01) {
			// 1% chance: Set answeredThreads between 25 and 450
			answeredThreads = Math.floor(Math.random() * (450 - 25 + 1)) + 25;
		} else {
			// 99% chance: Set answeredThreads between 0 and 24 (skewing towards 0)
			if (Math.random() < 0.85) {
				// 70% chance of having 0 answeredThreads
				answeredThreads = 0;
			} else {
				// 30% chance of having between 1 and 24 answeredThreads
				answeredThreads = Math.floor(Math.random() * 100) + 1;
			}
		}

		const fakeImage = faker.image.avatarGitHub();
		const fakeUsername = faker.internet.displayName();

		noIndexUser.push({
			id: noIndexUserId,
			name: fakeUsername,
			profilePictureUrl: fakeImage,
			answeredThreads: answeredThreads,
		});

		withIndexUser.push({
			id: withIndexUserId,
			name: fakeUsername,
			profilePictureUrl: fakeImage,
			answeredThreads: answeredThreads,
		});
	}

	const batchSize = 1000;
	for (let i = 0; i < newEntries; i += batchSize) {
		// Slice the arrays to create batches of 1,000 rows each
		const noIndexBatch = noIndexUser.slice(i, i + batchSize);
		const withIndexBatch = withIndexUser.slice(i, i + batchSize);

		// Insert the batches into the database within a transaction
		await db.transaction(async (tx) => {
			await tx.insert(accountsNoIndex).values(noIndexBatch);
			await tx.insert(accountsWithIndex).values(withIndexBatch);
		});
	}
};

export const addOne = async () => {
	const noIndexUserId = generateUuid('acc_no');
	const withIndexUserId = generateUuid('acc_with');

	let answeredThreads;

	// Determine the range for answeredThreads based on a 10% probability
	if (Math.random() < 0.1) {
		// 10% chance: Set answeredThreads between 25 and 450
		answeredThreads = Math.floor(Math.random() * (450 - 25 + 1)) + 25;
	} else {
		// 90% chance: Set answeredThreads between 0 and 24 (skewing towards 0)
		if (Math.random() < 0.7) {
			// 70% chance of having 0 answeredThreads
			answeredThreads = 0;
		} else {
			// 30% chance of having between 1 and 24 answeredThreads
			answeredThreads = Math.floor(Math.random() * 24) + 1;
		}
	}

	const fakeImage = faker.image.avatarGitHub();
	const fakeUsername = faker.internet.displayName();

	return await db.transaction(async (tx) => {
		let startTime = performance.now();
		await tx.insert(accountsNoIndex).values({
			id: noIndexUserId,
			name: fakeUsername,
			profilePictureUrl: fakeImage,
			answeredThreads: answeredThreads,
		});
		let endTime = performance.now();
		const insertNoIndexTime = (endTime - startTime).toFixed(2);
		startTime = performance.now();
		await tx.insert(accountsWithIndex).values({
			id: withIndexUserId,
			name: fakeUsername,
			profilePictureUrl: fakeImage,
			answeredThreads: answeredThreads,
		});
		endTime = performance.now();
		const insertWithIndexTime = (endTime - startTime).toFixed(2);

		return {
			insertNoIndexTime,
			insertWithIndexTime,
		};
	});
};
