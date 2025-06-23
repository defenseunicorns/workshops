/**
 * Copyright 2025 Defense Unicorns
 * SPDX-License-Identifier: AGPL-3.0-or-later OR LicenseRef-Defense-Unicorns-Commercial
 */

import { readable } from 'svelte/store';
import { browser } from '$app/environment';

const reduced_motion_query = '(prefers-reduced-motion: reduce)';

const get_initial_motion_preference = () => {
	if (!browser) return false;
	return window.matchMedia(reduced_motion_query).matches;
};

export const reduced_motion = readable(get_initial_motion_preference(), (set) => {
	if (browser) {
		const set_reduced_motion = (event: MediaQueryListEvent) => {
			set(event.matches);
		};
		const media_query_list = window.matchMedia(reduced_motion_query);
		media_query_list.addEventListener('change', set_reduced_motion);

		return () => {
			media_query_list.removeEventListener('change', set_reduced_motion);
		};
	}
});
