import UrlBank from "../models/UrlBank.js";
import BaseRepository from "./BaseRepository.js";

/**
 * @description BaseRepository
 * @class UrlbankRepository
 */
class UrlbankRepository extends BaseRepository {
  /**
   * @description create a new document
   * @param {string} model
   * @returns {document} returns a newly created document
   */
  constructor() {
    super(UrlBank);
  }
}

export default UrlbankRepository;
