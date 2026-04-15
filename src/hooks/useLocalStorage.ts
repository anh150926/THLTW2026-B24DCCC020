import { useState, useCallback } from 'react';

function useLuuTru<T>(key: string, giaTriMacDinh: T): [T, (val: T | ((prev: T) => T)) => void] {
	const [data, setData] = useState<T>(() => {
		try {
			const raw = localStorage.getItem(key);
			if (raw !== null) {
				return JSON.parse(raw) as T;
			}
		} catch {
		}
		return giaTriMacDinh;
	});

	const capNhat = useCallback(
		(val: T | ((prev: T) => T)) => {
			setData((prev) => {
				const giaTriMoi = typeof val === 'function' ? (val as (prev: T) => T)(prev) : val;
				try {
					localStorage.setItem(key, JSON.stringify(giaTriMoi));
				} catch {
				}
				return giaTriMoi;
			});
		},
		[key],
	);

	return [data, capNhat];
}

export default useLuuTru;
