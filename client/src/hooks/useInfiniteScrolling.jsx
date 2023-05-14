import { useRef, useCallback } from 'react';

const useInfinitScrolling = (loading, hasMore, setPageNumber) => {
	const observer = useRef();

	const lastElementRef = useCallback(
		(node) => {
			if (loading || !hasMore) return;

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					setPageNumber((prevPageNumber) => prevPageNumber + 1);
				}
			});

			if (node) observer.current.observe(node);

			return () => {
				if (observer.current) {
					observer.current.disconnect();
				}
			};
		},
		[hasMore, setPageNumber]
	);

	return lastElementRef;
};

export default useInfinitScrolling;
