export class ZodToErrorCodeConverter {
	static #instance: ZodToErrorCodeConverter;

	/**
	 * The Singleton's constructor should always be private to prevent direct
	 * construction calls with the `new` operator.
	 */
	private constructor() {}

	/**
	 * The static getter that controls access to the singleton instance.
	 *
	 * This implementation allows you to extend the Singleton class while
	 * keeping just one instance of each subclass around.
	 */
	public static get instance(): ZodToErrorCodeConverter {
		if (!ZodToErrorCodeConverter.#instance) {
			ZodToErrorCodeConverter.#instance = new ZodToErrorCodeConverter();
		}

		return ZodToErrorCodeConverter.#instance;
	}
}