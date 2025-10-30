export class PaginateResponseDto<T> {
	items: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;

	constructor(
		items: T[],
		total: number,
		page: number,
		limit: number,
		totalPages: number,
		hasNextPage: boolean,
		hasPreviousPage: boolean
	) {
		this.items = items;
		this.total = total;
		this.page = page;
		this.limit = limit;
		this.totalPages = totalPages;
		this.hasNextPage = hasNextPage;
		this.hasPreviousPage = hasPreviousPage;
	}
}
