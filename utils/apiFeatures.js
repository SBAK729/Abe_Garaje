class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    let queryObj = { ...this.queryString };
    let execlude = ["fields", "sort", "limit", "page"];
    execlude.forEach((el) => delete queryObj[el]);

    queryObj = JSON.stringify(queryObj);
    queryObj.replace(/\b{gte|gt|lte|lt}\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryObj));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      let sortBy = this.queryString.sort.split(",").join(" ");

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-registered_at");
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      let fields = this.queryString.fields.split(",").join(" ");

      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-password");
    }

    return this;
  }

  pagnation() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default APIFeatures;
