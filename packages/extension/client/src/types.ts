export interface EmbeddedRegion {
	languageId: string | undefined;
	start: number;
	/**
	 * End is inclusive!
	 */
	end: number;
}
