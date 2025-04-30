const getPagination = (page, limit) => {
    const parsedPage = Math.max(parseInt(page) || 1, 1);
    const parsedLimit = Math.max(parseInt(limit) || 10, 1);
    const offset = (parsedPage - 1) * parsedLimit;
  
    return {
      page: parsedPage,
      limit: parsedLimit,
      offset
    };
  };
  
  module.exports = {
    getPagination
  };