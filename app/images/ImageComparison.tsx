'use client';

import Image from 'next/image';
import { useImageLoadTime } from './useImageLoadTime';

interface ImageComparisonProps {
	src: string;
	alt: string;
	title: string;
	width: number;
	height: number;
	useNextImage?: boolean;
}

export function ImageComparison({
	src,
	alt,
	title,
	width,
	height,
	useNextImage = false,
}: ImageComparisonProps) {
	const loadTime = useImageLoadTime(src);

	return (
		<div className="flex flex-col items-center p-4 border rounded-lg">
			<h2 className="text-xl font-bold mb-2">{title}</h2>
			<div className="relative">
				{useNextImage ? (
					<Image
						src={src || '/placeholder.svg'}
						alt={alt}
						width={width}
						height={height}
					/>
				) : (
					// eslint-disable-next-line @next/next/no-img-element
					<img src={src || '/placeholder.svg'} alt={alt} width={width} height={height} />
				)}
				{loadTime === null && (
					<div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
					</div>
				)}
			</div>
			<p className="mt-2">
				{loadTime === null ? (
					'Loading...'
				) : loadTime === -1 ? (
					'Error loading image'
				) : (
					<>
						Load time:{' '}
						<span
							style={{
								color: loadTime ? (loadTime <= 100 ? 'green' : 'red') : 'black',
							}}>
							{`${loadTime.toFixed(2)}ms`}
						</span>
					</>
				)}
			</p>
		</div>
	);
}
