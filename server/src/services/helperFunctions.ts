import BadRequestError from '../errors/BadRequestError';

export const parseFilterOptions = (options: {
  page?: string;
  limit?: string;
  search?: string;
  sort?: string;
  asc?: string;
}) => {
  const {
    page = '1',
    limit = '10',
    search = '',
    sort = 'ABC',
    asc = 'false',
  } = options;

  const parsedPage = parseInt(page, 10);
  const parsedLimit = parseInt(limit, 10);
  const parsedAsc = asc === 'false';

  if (isNaN(parsedPage) || parsedPage < 1) {
    throw new BadRequestError({
      code: 400,
      message: 'Invalid page number. Must be a positive integer.',
    });
  }

  if (isNaN(parsedLimit) || parsedLimit < 1) {
    throw new BadRequestError({
      code: 400,
      message: 'Invalid limit. Must be a positive integer.',
    });
  }

  return {
    page: parsedPage,
    limit: parsedLimit,
    search,
    sort,
    asc: parsedAsc,
  };
};
