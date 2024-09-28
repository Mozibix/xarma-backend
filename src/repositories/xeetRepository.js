import BaseRepository from './BaseRepository.js';
import Xeet from '../models/Xeets.js';

/**
 * @description BaseRepository
 * @class XeetRepository
 */
class XeetRepository extends BaseRepository {
  /**
     * @description create a new document
     * @param {string} model
     * @returns {document} returns a newly created document
     */
  constructor() {
    super(Xeet);
  }
}

export default XeetRepository;
