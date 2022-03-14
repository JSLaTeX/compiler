export interface EmbeddedRegion {
	languageId: string | undefined;
	start: number;
	/**
	 * End is exclusive!
	 */
	end: number;
}
