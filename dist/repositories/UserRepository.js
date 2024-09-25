import BaseRepository from './BaseRepository.js';
import Users from '../../src/models/Users.js';

/**
 * @description BaseRepository
 * @class BaseRepository
 */
class UsersRepository extends BaseRepository {
  /**
     * @description create a new document
     * @param {string} model
     * @returns {document} returns a newly created document
     */
  constructor() {
    super(Users);
  }
}
export default UsersRepository;