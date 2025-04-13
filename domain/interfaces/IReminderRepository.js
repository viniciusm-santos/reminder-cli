/**
 * @interface IReminderRepository
 */
class IReminderRepository {
  /**
   * Cria um novo lembrete
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async create(data) {
    throw new Error("Method not implemented.");
  }

  /**
   * Lista todos os lembretes
   * @returns {Promise<Array>}
   */
  async list() {
    throw new Error("Method not implemented.");
  }

  /**
   * Atualiza um lembrete por ID
   * @param {string} id
   * @param {Object} data
   * @returns {Promise<void>}
   */
  async updateById(id, data) {
    throw new Error("Method not implemented.");
  }

  /**
   * Deleta um lembrete por ID
   * @param {string} id
   * @returns {Promise<void>}
   */
  async deleteById(id) {
    throw new Error("Method not implemented.");
  }
}

module.exports = IReminderRepository;
