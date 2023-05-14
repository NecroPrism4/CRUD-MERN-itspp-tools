import { useRef, useCallback } from 'react';

const useInfinitScrolling = (loading, hasMore, setPageNumber) => {
	const observer = useRef();

	const lastElementRef = useCallback(
		(node) => {
			loading
				? null
				: (observer.current = new IntersectionObserver((entries) => {
						if (entries[0].isIntersecting && hasMore) {
							setPageNumber((prevPageNumber) => prevPageNumber + 1);
						}
				  }));
			if (node) observer.current.observe(node);
		},
		[hasMore, setPageNumber]
	);

	return lastElementRef;
};

export default useInfinitScrolling;
