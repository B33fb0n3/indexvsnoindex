import React from 'react';
import { ImageComparison } from './ImageComparison';

type ImagesPageProps = {};

export default function ImagesPage({}: ImagesPageProps) {
	const paths = ['/images/Handwerk_technisch.png'];

	return (
		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-8 text-center">Image Loading Comparison</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{paths.map((path) => {
					const currentImageUrl = 'https://pickimage.blob.core.windows.net' + path;
					const cdnImageUrl = 'https://pick-test.b-cdn.net' + path;

					return (
						<React.Fragment key={path}>
							<ImageComparison
								src={currentImageUrl}
								alt="Image without CDN"
								title="Without CDN (Current)"
								width={400}
								height={300}
							/>
							<ImageComparison
								src={cdnImageUrl}
								alt="Image with CDN"
								title="With CDN"
								width={400}
								height={300}
							/>
							<ImageComparison
								src={cdnImageUrl}
								alt="Image Optimization"
								title="Image (Optimized)"
								width={390}
								height={220}
								useNextImage={true}
							/>
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
}
