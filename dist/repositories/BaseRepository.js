/**
 * @description BaseRepository
 * @class BaseRepository
 */
class BaseRepository {
  /**
     * @description create a new document
     * @param {model} model
     * @returns {document} returns a newly created document
     */
  constructor(model) {
    this.model = model;
  }

  /**
     * @description create a new document
     * @param {option} options
     * @returns {document} returns a newly created document
     */
  async create(options) {
    try {
      const document = await this.model.create(options);
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Fetch documents by field
   * @param {string} field
   * @param {any} value
   * @returns {Document} Resolves to array of documents.
   */
  async findByField(field, value) {
    try {
      const documents = await this.model.findOne({
        [field]: value
      }).exec();
      return documents;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Fetch documents by field
   * @param {Object} options
   * @param {any} value
   * @returns {Document} Resolves to array of documents.
   */
  async findByMany(options) {
    try {
      const documents = await this.model.findOne(options).exec();
      return documents;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Fetch document by id
   * @param {number} userId Document id
   * @returns {Document} Resolves to found document.
   */
  async findById(userId) {
    try {
      const document = await this.model.findOne({
        userId
      }).exec();
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Fetch all documents
   * @param {object} query
   * @returns {Document} Resolves to array of documents.
   */
  async findAll(query) {
    try {
      const documents = await this.model.find(query);
      return documents;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Update a document by id
   * @param {string} userId
   * @param {any} options
   * @returns {Document} Updated document
   */
  async update(userId, options) {
    try {
      const document = await this.model.findOneAndUpdate({
        userId
      }, options, {
        new: true
      });
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Updates a document by id
   * @param {object} query
   * @param {object} field
   * @param {any} value
   * @param {object} secondField
   * @param {any} secondValue
   * @returns {Document} Updated document
   */
  async singleInsert(query, field, value) {
    try {
      const document = await this.model.findOneAndUpdate(query, {
        $set: {
          [field]: value
        }
      }, {
        new: true
      });
      return document;
    } catch (error) {
      throw error;
    }
  }
}
export default BaseRepository;