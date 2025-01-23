import { useEffect, useState } from 'react';

export function useImageLoadTime(src: string) {
	const [loadTime, setLoadTime] = useState<number | null>(null);

	useEffect(() => {
		const startTime = performance.now();
		const img = new Image();
		img.src = src;
		img.onload = () => {
			const endTime = performance.now();
			setLoadTime(endTime - startTime);
		};
		img.onerror = () => {
			setLoadTime(-1); // Indicate error
		};
	}, [src]);

	return loadTime;
}
