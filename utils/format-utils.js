import _ from 'lodash';

class FormatUtils {
	static formatQuery(query, options) {
		const parsedOptions = _.defaults(options, {
			sortBy: 'id',
			sortOrder: 'asc',
			pageSize: -1,
			page: 1
		});

		return Promise.resolve().then(() => {
			if(options.where) {
				return JSON.parse(options.where);
			}
		}).then(parsedWhere => {
			parsedOptions.where = parsedWhere || {};
			return query.where(parsedOptions.where)
				.limit(parsedOptions.pageSize)
				.skip((parsedOptions.page - 1) * parsedOptions.pageSize)
				.sort(parsedOptions.sortBy + ' ' + parsedOptions.sortOrder);
		});
	}
}


export default FormatUtils;